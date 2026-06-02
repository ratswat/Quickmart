# Frontend Application - Quickmart E-Commerce Platform

This directory contains the Next.js React frontend for the Quickmart supermarket e-commerce platform.

## Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Redux state management
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── middleware/        # Middleware functions
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest testing configuration
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your configuration:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Quickmart
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

### Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Key Features Implemented

- ✅ User authentication (JWT + OAuth)
- ✅ Product catalog with filters
- ✅ Shopping cart with persistence
- ✅ Checkout flow
- ✅ Order tracking
- ✅ User dashboard
- ✅ Admin panel
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Accessibility (WCAG)

## Technologies Used

- **Next.js 14**: React framework with SSR/SSG
- **TypeScript**: Static type checking
- **React 18**: UI library
- **Redux Toolkit**: State management
- **Tailwind CSS**: Utility-first CSS
- **React Hook Form**: Form management
- **Axios**: HTTP client
- **Jest & React Testing Library**: Testing

## File Organization

### Pages (src/app)
- `(auth)`: Authentication pages (login, register, password reset)
- `(shop)`: Shopping pages (products, cart, checkout)
- `(user)`: User account pages (dashboard, profile, orders)
- `(admin)`: Admin panel pages (dashboard, products, orders)

### Components
- `layout/`: Layout components (Header, Footer, Navigation)
- `common/`: Reusable UI components (Button, Card, Modal, etc.)
- `product/`: Product-specific components
- `cart/`: Shopping cart components
- `checkout/`: Checkout flow components
- `admin/`: Admin panel components

### Hooks
- `useAuth`: Authentication logic
- `useCart`: Shopping cart state
- `useProducts`: Product data fetching
- `useOrders`: Order management
- `usePagination`: Pagination logic

### Services
- `api.ts`: Axios instance with interceptors
- `auth.service.ts`: Authentication API calls
- `product.service.ts`: Product API calls
- `cart.service.ts`: Shopping cart API calls
- `order.service.ts`: Order API calls
- `payment.service.ts`: Payment processing
- `user.service.ts`: User profile API calls

## Environment Variables

See `.env.example` for all available environment variables.

## Contributing

Please follow the coding standards and create feature branches from `develop`.

## Support

For issues and questions, please open an issue on GitHub.
