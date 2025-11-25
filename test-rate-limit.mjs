// Rate Limiter Test Script
// This script tests the rate limiting functionality

const BASE_URL = 'http://localhost:3000';

async function makeRequest(endpoint, requestNumber) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const headers = {
      'X-RateLimit-Limit': response.headers.get('X-RateLimit-Limit'),
      'X-RateLimit-Remaining': response.headers.get('X-RateLimit-Remaining'),
      'X-RateLimit-Reset': response.headers.get('X-RateLimit-Reset'),
      'X-RateLimit-Cooldown': response.headers.get('X-RateLimit-Cooldown'),
      'Retry-After': response.headers.get('Retry-After'),
    };

    const status = response.status;
    let body = null;
    
    if (status === 429) {
      body = await response.json();
    }

    return { requestNumber, endpoint, status, headers, body };
  } catch (error) {
    return { requestNumber, endpoint, error: error.message };
  }
}

async function testRateLimit() {
  console.log('🧪 Testing Rate Limiter\n');
  console.log('Configuration:');
  console.log('- Limit: 100 requests per minute');
  console.log('- Cooldown: 3 minutes when exceeded');
  console.log('- Excluded: /api/events\n');

  // Test 1: Normal requests
  console.log('📝 Test 1: Making 5 normal requests to /');
  for (let i = 1; i <= 5; i++) {
    const result = await makeRequest('/', i);
    if (result.error) {
      console.log(`Request ${i}: Error - ${result.error}`);
    } else {
      console.log(`Request ${result.requestNumber}: Status ${result.status}, Remaining: ${result.headers['X-RateLimit-Remaining'] || 'N/A'}`);
    }
  }

  // Test 2: Excluded endpoint
  console.log('\n📝 Test 2: Testing excluded endpoint /api/events (should NOT have rate limit headers)');
  for (let i = 1; i <= 3; i++) {
    const result = await makeRequest('/api/events', i);
    console.log(`Request ${i}: Status ${result.status}, Has Rate Limit Headers: ${result.headers['X-RateLimit-Limit'] ? 'Yes' : 'No'}`);
  }

  // Test 3: Rapid requests to trigger rate limit
  console.log('\n📝 Test 3: Making 105 rapid requests to trigger rate limit...');
  const results = [];
  
  for (let i = 1; i <= 105; i++) {
    const result = await makeRequest('/', i);
    results.push(result);
    
    // Show progress every 20 requests
    if (i % 20 === 0) {
      console.log(`  Progress: ${i}/105 requests sent...`);
    }
  }

  // Analyze results
  const successCount = results.filter(r => r.status === 200).length;
  const rateLimitedCount = results.filter(r => r.status === 429).length;
  const firstRateLimited = results.find(r => r.status === 429);

  console.log(`\n✅ Results:`);
  console.log(`  - Successful requests: ${successCount}`);
  console.log(`  - Rate limited requests: ${rateLimitedCount}`);
  
  if (firstRateLimited) {
    console.log(`  - First rate limited at request #${firstRateLimited.requestNumber}`);
    console.log(`  - Error message: ${firstRateLimited.body?.message}`);
    console.log(`  - Retry after: ${firstRateLimited.headers['Retry-After']} seconds`);
    console.log(`  - In cooldown: ${firstRateLimited.headers['X-RateLimit-Cooldown'] === 'true' ? 'Yes' : 'No'}`);
  }

  // Test 4: Verify cooldown
  if (rateLimitedCount > 0) {
    console.log('\n📝 Test 4: Verifying cooldown period (making another request)...');
    const cooldownTest = await makeRequest('/', 106);
    console.log(`  Status: ${cooldownTest.status}`);
    if (cooldownTest.status === 429) {
      console.log(`  Still in cooldown: Yes`);
      console.log(`  Message: ${cooldownTest.body?.message}`);
    }
  }

  console.log('\n✅ Rate limiter test completed!');
}

// Run the test
testRateLimit().catch(console.error);
