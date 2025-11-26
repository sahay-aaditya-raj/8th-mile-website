# 🎉 8th Mile Website

<div align="center">
  <img src="./public/8th mile Logo High res-03.png" alt="8th Mile Logo" width="200"/>
  
  <h3>The Official Website for 8th Mile - RVCE's Premier Cultural Festival</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.0-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![React](https://img.shields.io/badge/React-19.1.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

8th Mile is the official website for RVCE's premier cultural festival. This modern, responsive web application provides a seamless experience for event registration, pass purchasing, and festival management. Built with cutting-edge technologies, it offers real-time payment processing, event management, and comprehensive user verification systems.

### Key Highlights

- 🎪 **Event Management**: Complete festival event organization and management
- 💳 **Payment Integration**: Secure PhonePe payment gateway integration
- 📱 **Responsive Design**: Mobile-first design with stunning animations
- 🎟️ **Pass System**: Digital pass generation and verification
- 📧 **Email System**: Automated email notifications and confirmations
- 🔐 **Verification**: QR code-based event and pass verification
- 🎨 **Modern UI**: Beautiful animations with Framer Motion and GSAP

---

## ✨ Features

### 🎪 Event Management

- Browse all festival events with detailed information
- Individual event pages with comprehensive details
- Event registration with participant management
- Real-time event updates and notifications

### 💳 Payment & Registration

- Secure PhonePe payment gateway integration
- Pass purchasing system (Student/Non-Student passes)
- Registration confirmation and tracking
- Automated email confirmations

### 🎟️ Digital Pass System

- QR code generation for passes and registrations
- Pass verification system for event organizers
- Digital pass download functionality
- Real-time verification status

### 🎨 User Experience

- Modern, responsive design
- Smooth animations and transitions
- Dark/Light theme support
- Progressive Web App (PWA) capabilities

### 📱 Mobile Features

- Mobile-optimized interface
- Touch-friendly interactions
- Offline capability
- App-like experience

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15.3.0](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.8.3](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4.1.4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Animations**:
  - [Framer Motion 12.7.4](https://www.framer.com/motion/) - Production-ready animations
  - [GSAP 3.12.7](https://greensock.com/gsap/) - High-performance animations
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

### Backend & Database

- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose 8.14.0](https://mongoosejs.com/)
- **Authentication**: Custom verification system
- **File Storage**: Local file system with optimized asset delivery

### Payment & Communication

- **Payment Gateway**: [PhonePe SDK](https://developer.phonepe.com/) - Secure payment processing
- **Email Service**: [Nodemailer 7.0.3](https://nodemailer.com/) - Email notifications
- **QR Codes**: [QRCode 1.5.4](https://www.npmjs.com/package/qrcode) - QR code generation

### Development & Build Tools

- **Package Manager**: npm
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Bundler**: Next.js with Turbopack (dev mode)

### UI/UX Libraries

- **State Management**: [Zustand 5.0.3](https://zustand-demo.pmnd.rs/) - Simple state management
- **Theme**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes) - Theme switching
- **Toast Notifications**: [React Hot Toast 2.5.2](https://react-hot-toast.com/)
- **Styling Utils**: [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

## 📸 Screenshots

### Homepage
<!-- TODO: Add homepage screenshot -->
![Homepage](./screenshots/homepage.png)
*Modern homepage with hero section and event highlights*

### Events Page
<!-- TODO: Add events page screenshot -->
![Events](./screenshots/events.png)
*Comprehensive events listing with beautiful 3D cards*

### Event Details
<!-- TODO: Add event details screenshot -->
![Event Details](./screenshots/event-details.png)
*Detailed event information with registration options*

### Checkout Process
<!-- TODO: Add checkout screenshot -->
![Checkout](./screenshots/checkout.png)
*Streamlined checkout process with PhonePe integration*

### Pass Verification
<!-- TODO: Add verification screenshot -->
![Verification](./screenshots/verification.png)
*QR code-based verification system for organizers*

### Mobile Experience
<!-- TODO: Add mobile screenshots -->
![Mobile](./screenshots/mobile.png)
*Responsive design optimized for mobile devices*

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn** or **pnpm**
- **MongoDB** database
- **PhonePe Merchant Account** (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sahay-aaditya-raj/8th-mile-website.git
   cd 8th-mile-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/8thmile
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # PhonePe Configuration
   PHONEPE_MERCHANT_ID=your_merchant_id
   PHONEPE_SALT_KEY=your_salt_key
   PHONEPE_SALT_INDEX=your_salt_index
   PHONEPE_UAT_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
   
   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Database Setup**

   Ensure MongoDB is running and create the required collections:

   ```bash
   # MongoDB will automatically create collections when data is inserted
   # The application uses: events, orders, registrations
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📡 API Documentation

### Base URL

```url
https://your-domain.com/api
```

### Authentication

Most endpoints are public. Admin endpoints require proper authentication.

### Endpoints

#### 🎪 Events API

##### GET `/api/events`

Fetch all events

**Response:**

```json
{
  "status": 200,
  "data": [
    {
      "_id": "photo-com",
      "slug": "photography-competition",
      "name": "Photography Competition",
      "description": "Capture the perfect moment",
      "date": "2025-03-15",
      "time": "10:00 AM",
      "venue": "Main Auditorium",
      "price": 100,
      "maxParticipants": 50,
      "contacts": [
        {
          "name": "John Doe",
          "phone": "+91-9876543210"
        }
      ]
    }
  ]
}
```

##### POST `/api/events`

Get specific event by slug

**Request Body:**

```json
{
  "slug": "photography-competition"
}
```

**Response:**

```json
{
  "status": 200,
  "data": {
    "_id": "photo-com",
    "slug": "photography-competition",
    "name": "Photography Competition",
    // ... event details
  }
}
```

#### 💳 Payment API

##### POST `/api/phonepe-order`

Create payment order

**Request Body:**

```json
{
  "type": "pass", // or "event"
  "data": {
    "passId": "student-pass", // or event details
    "name": "Student Name",
    "email": "student@example.com",
    "phone": "+91-9876543210",
    "merchantOrderId": "unique-order-id"
  }
}
```

**Response:**

```json
{
  "success": true,
  "redirectUrl": "https://phonepe-payment-url",
  "merchantOrderId": "unique-order-id"
}
```

#### ✉️ Contact API

##### POST `/api/contact`

Send contact form message

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "message": "Your message here"
}
```

**Response:**

```json
{
  "message": "Message received!",
  "status": 200
}
```

#### 🎟️ Verification API

##### GET `/api/verify?payment_id={id}`

Verify payment and process registration

**Query Parameters:**

- `payment_id`: Payment identifier

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "orderId": "order-id",
    "status": "SUCCESS"
  }
}
```

#### 📊 Registration Data API

##### GET `/api/registration-data?payment_id={id}`

Get registration details

**Query Parameters:**

- `payment_id`: Payment identifier

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "payment-id",
    "name": "Participant Name",
    "email": "participant@example.com",
    "type": "pass",
    "amount": 200,
    "participantsData": [
      {
        "name": "Participant 1",
        "arrived": false
      }
    ]
  }
}
```

---

## 🗄️ Database Schema

### MongoDB Collections

#### Events Collection

```javascript
{
  _id: String,              // Event code (e.g., "photo-com")
  slug: String,             // URL-friendly name
  name: String,             // Display name
  description: String,      // Event description
  date: String,             // Event date
  time: String,             // Event time
  venue: String,            // Event venue
  price: Number,            // Registration fee
  maxParticipants: Number,  // Participant limit
  photoPath: String,        // Event image path
  contacts: [{
    name: String,           // Organizer name
    phone: String           // Contact number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Orders Collection

```javascript
{
  _id: String,              // Unique order ID
  merchantOrderId: String,  // PhonePe order ID
  phonePayOrderId: String,  // PhonePe transaction ID
  paymentStatus: String,    // PENDING | SUCCESS | FAILED
  mailSent: Boolean,        // Email sent status
  name: String,             // Customer name
  email: String,            // Customer email
  phone: String,            // Customer phone
  amount: Number,           // Payment amount
  type: String,             // pass | event
  classId: String,          // Pass/Event identifier
  noOfParticipants: Number, // Number of participants
  participantsData: [{
    name: String,           // Participant name
    arrived: Boolean        // Arrival status
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Registrations Collection

```javascript
{
  _id: String,              // Registration ID
  orderId: String,          // Related order ID
  signature: String,        // Payment signature
  name: String,             // Registrant name
  email: String,            // Registrant email
  phone: String,            // Registrant phone
  amount: Number,           // Registration amount
  type: String,             // pass | event
  classId: String,          // Pass/Event identifier
  noOfParticipants: Number, // Number of participants
  participantsData: [{
    name: String,           // Participant name
    arrived: Boolean        // Check-in status
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Database Relationships

```mermaid
erDiagram
    EVENTS ||--o{ ORDERS : "can have"
    ORDERS ||--|| REGISTRATIONS : "creates"
    ORDERS ||--o{ PARTICIPANTS : "contains"
    REGISTRATIONS ||--o{ PARTICIPANTS : "contains"
    
    EVENTS {
        string id PK
        string slug
        string name
        string description
        date event_date
        number price
        array contacts
    }
    
    ORDERS {
        string id PK
        string merchantOrderId
        string paymentStatus
        string email
        number amount
        string type
        array participantsData
    }
    
    REGISTRATIONS {
        string id PK
        string orderId FK
        string signature
        string email
        number amount
        string type
        array participantsData
    }
    
    PARTICIPANTS {
        string name
        boolean arrived
    }
```

---

## 🚀 Deployment

### Environment Variables

Create production environment variables:

```env
# Production Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/8thmile

# Production App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# PhonePe Production
PHONEPE_MERCHANT_ID=your_production_merchant_id
PHONEPE_SALT_KEY=your_production_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_UAT_URL=https://api.phonepe.com/apis/hermes

# Email Configuration
EMAIL_USER=noreply@your-domain.com
EMAIL_PASS=your_secure_app_password
```

### Deployment Options

#### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Add all environment variables
   - Redeploy

#### Option 2: Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**

   ```bash
   docker build -t 8thmile-website .
   docker run -p 3000:3000 8thmile-website
   ```

#### Option 3: Traditional Server

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start with PM2**

   ```bash
   npm install -g pm2
   pm2 start npm --name "8thmile" -- start
   ```

### Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection secured
- [ ] PhonePe production credentials
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email service configured
- [ ] Backup strategy implemented
- [ ] Monitoring setup
- [ ] Error tracking configured

---

## 📁 Project Structure

```dir
8th-mile-website/
├── 📁 app/                      # Next.js App Router
│   ├── 📄 globals.css          # Global styles
│   ├── 📄 layout.tsx           # Root layout
│   ├── 📄 page.tsx             # Homepage
│   ├── 📁 api/                 # API routes
│   │   ├── 📁 contact/         # Contact form API
│   │   ├── 📁 events/          # Events API
│   │   ├── 📁 phonepe-order/   # Payment API
│   │   ├── 📁 registration-data/ # Registration API
│   │   └── 📁 verify/          # Verification API
│   ├── 📁 checkout/            # Checkout pages
│   ├── 📁 events/              # Event pages
│   ├── 📁 passes/              # Pass pages
│   └── 📁 [other-routes]/      # Other app routes
│
├── 📁 components/              # React components
│   ├── 📄 EventVerification.tsx
│   ├── 📄 PassVerification.tsx
│   ├── 📄 Navbar2.tsx
│   ├── 📄 Footer2.tsx
│   ├── 📁 ui/                  # UI components
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 3d-card.tsx
│   │   └── 📄 [other-ui]/
│   └── 📁 magicui/             # Magic UI components
│
├── 📁 lib/                     # Utility libraries
│   ├── 📄 db.ts                # Database connection
│   ├── 📄 utils.ts             # General utilities
│   ├── 📄 phonepay.ts          # PhonePe integration
│   ├── 📄 server-utils.ts      # Server utilities
│   └── 📁 models/              # Database models
│       ├── 📄 Event.ts         # Event model
│       ├── 📄 Orders.ts        # Orders model
│       └── 📄 Registrations.ts # Registrations model
│
├── 📁 data/                    # Static data
│   ├── 📄 events.ts            # Events data
│   └── 📄 passes.ts            # Passes data
│
├── 📁 contexts/                # React contexts
│   ├── 📄 NavbarContext.tsx    # Navbar state
│   └── 📄 SidebarContext.tsx   # Sidebar state
│
├── 📁 types/                   # TypeScript types
│   └── 📄 index.ts             # Type definitions
│
├── 📁 public/                  # Static assets
│   ├── 📁 events/              # Event images
│   ├── 📁 gallery/             # Gallery images
│   ├── 📁 images/              # General images
│   └── 📄 [logos-and-icons]    # Logos and icons
│
├── 📄 package.json             # Dependencies
├── 📄 next.config.ts           # Next.js configuration
├── 📄 tailwind.config.js       # Tailwind configuration
├── 📄 tsconfig.json            # TypeScript configuration
└── 📄 README.md                # This file
```

### Key Directories

- **`/app`**: Next.js 13+ App Router with file-based routing
- **`/components`**: Reusable React components and UI elements
- **`/lib`**: Utility functions, database models, and integrations
- **`/public`**: Static assets served directly by Next.js
- **`/types`**: TypeScript type definitions for better type safety

---

## 🤝 Contributing

We welcome contributions to make 8th Mile Website even better!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
4. **Run tests and linting**

   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**

   ```bash
   git commit -m 'Add amazing feature'
   ```

6. **Push to the branch**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow the existing component structure
- Add proper TypeScript types
- Use Tailwind CSS for styling
- Follow the established naming conventions

### Bug Reports

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **RVCE** - For hosting the amazing 8th Mile festival
- **Next.js Team** - For the excellent React framework
- **Vercel** - For seamless deployment platform
- **PhonePe** - For secure payment processing
- **MongoDB** - For reliable database services
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📞 Support

For support and queries:

- **Email**: <8thmile@rvce.edu.in>
- **Website**: [8th Mile Official](https://your-domain.com)
- **GitHub Issues**: [Create an Issue](https://github.com/sahay-aaditya-raj/8th-mile-website/issues)

---
