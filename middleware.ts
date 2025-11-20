import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 100
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const COOLDOWN_PERIOD_MS = 3 * 60 * 1000 // 3 minutes

// In-memory store for rate limiting
interface RateLimitEntry {
  count: number
  resetTime: number
  inCooldown: boolean
  cooldownEnds?: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.inCooldown && entry.cooldownEnds && now > entry.cooldownEnds) {
      rateLimitStore.delete(key)
    } else if (!entry.inCooldown && now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

function getClientIP(request: NextRequest): string {
  // Try to get the real IP from headers (useful when behind proxies)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  // Fallback to a default if no IP is found
  return 'unknown'
}

function checkRateLimit(ip: string): {
  allowed: boolean
  remaining: number
  resetTime: number
  inCooldown: boolean
  cooldownEnds?: number
} {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  // Check if IP is in cooldown
  if (entry?.inCooldown) {
    if (entry.cooldownEnds && now < entry.cooldownEnds) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.cooldownEnds,
        inCooldown: true,
        cooldownEnds: entry.cooldownEnds,
      }
    } else {
      // Cooldown expired, remove entry
      rateLimitStore.delete(ip)
    }
  }

  // Initialize or reset if window expired
  if (!entry || now > entry.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW_MS
    rateLimitStore.set(ip, {
      count: 1,
      resetTime,
      inCooldown: false,
    })
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime,
      inCooldown: false,
    }
  }

  // Increment counter
  entry.count++

  // Check if limit exceeded
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    // Enter cooldown period
    const cooldownEnds = now + COOLDOWN_PERIOD_MS
    entry.inCooldown = true
    entry.cooldownEnds = cooldownEnds
    rateLimitStore.set(ip, entry)

    return {
      allowed: false,
      remaining: 0,
      resetTime: cooldownEnds,
      inCooldown: true,
      cooldownEnds,
    }
  }

  rateLimitStore.set(ip, entry)
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
    inCooldown: false,
  }
}

export function middleware(request: NextRequest) {
  // Apply rate limiting to all routes
  const ip = getClientIP(request)
  const rateLimitResult = checkRateLimit(ip)

  // Create response with rate limit headers
  const response = rateLimitResult.allowed
    ? NextResponse.next()
    : NextResponse.json(
        {
          error: rateLimitResult.inCooldown
            ? 'Too many requests. You are in cooldown period.'
            : 'Rate limit exceeded',
          message: rateLimitResult.inCooldown
            ? `Please wait ${Math.ceil((rateLimitResult.cooldownEnds! - Date.now()) / 1000)} seconds before trying again.`
            : `You have exceeded the rate limit of ${RATE_LIMIT_MAX_REQUESTS} requests per minute.`,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { status: 429 }
      )

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
  response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
  response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())
  
  if (!rateLimitResult.allowed) {
    response.headers.set('Retry-After', Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString())
    if (rateLimitResult.inCooldown) {
      response.headers.set('X-RateLimit-Cooldown', 'true')
      response.headers.set('X-RateLimit-Cooldown-Ends', new Date(rateLimitResult.cooldownEnds!).toISOString())
    }
  }

  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
}
