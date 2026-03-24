# Delivery App

A food delivery web application built with React and Node.js.

**Complexity Level:** Advanced

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- CSS Modules

### Backend
- Node.js + Express + TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Celebrate (validation)

## Features

### Base Level
- [x] Shops page with restaurant listing
- [x] Product catalog with add-to-cart functionality
- [x] Shopping cart with quantity management
- [x] Order placement with form validation
- [x] Order persistence in database

### Middle Level
- [x] Responsive design
- [x] Product filtering by category
- [x] Product sorting (price, name)
- [x] Shop filtering by rating

### Advanced Level
- [x] User authentication (register/login)
- [x] Order history with search
- [x] Reorder previous orders
- [x] Coupon system with validation

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Demo Coupons
- `SAVE10` - 10% off (min order $20)
- `SAVE20` - 20% off (min order $50)
- `FREESHIP` - $5 off (min order $30)

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/shops | List shops | No |
| GET | /api/products | List products | No |
| GET | /api/coupons | List coupons | No |
| POST | /api/coupons/validate | Validate coupon | No |
| POST | /api/orders | Create order | Yes |
| GET | /api/orders | Get user orders | Yes |
| POST | /api/orders/:id/reorder | Reorder | Yes |

## Project Structure

```
delivery-app/
├── backend/
│   ├── src/
│   │   ├── config/       # DB connection
│   │   ├── controllers/  # API handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── validations/  # Celebrate schemas
│   │   ├── middleware/    # Auth, error handling
│   │   └── utils/        # Seed data
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   ├── services/    # API calls
│   │   └── types/       # TypeScript types
│   └── package.json
│
└── README.md
```

## Deployment

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`

### Frontend (Vercel)
1. Import project
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` - your backend URL

## Author

Created for ElifTech School test task.
