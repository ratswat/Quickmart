# Comprehensive API Documentation

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication
All endpoints (except auth) require JWT token in Authorization header:
```
Authorization: Bearer {jwt_token}
```

---

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210"
}

Response (201):
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response (200):
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response (200):
{
  "message": "Logged out successfully"
}
```

### Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

Response (200):
{
  "message": "Password reset email sent"
}
```

### Reset Password
```
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePassword123"
}

Response (200):
{
  "message": "Password reset successfully"
}
```

### Refresh Token
```
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}

Response (200):
{
  "token": "new_jwt_token_here"
}
```

---

## Products Endpoints

### List Products
```
GET /products?page=1&limit=20&category=fruits&minPrice=100&maxPrice=500&sort=popular

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20, max: 100)
- category: Filter by category
- minPrice: Minimum price
- maxPrice: Maximum price
- brand: Filter by brand
- sort: popularity | price_asc | price_desc | rating | newest
- search: Search term

Response (200):
{
  "products": [
    {
      "id": "uuid",
      "name": "Organic Apples",
      "price": 299.99,
      "discountPrice": 249.99,
      "images": ["url"],
      "rating": 4.5,
      "reviews": 150,
      "stock": 50,
      "isOrganic": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```

### Get Product Details
```
GET /products/{productId}

Response (200):
{
  "product": {
    "id": "uuid",
    "name": "Organic Apples",
    "description": "Fresh organic apples...",
    "price": 299.99,
    "images": ["url1", "url2"],
    "rating": 4.5,
    "reviews": 150,
    "stock": 50,
    "category": "Fruits",
    "brand": "FreshFarms",
    "nutritionalInfo": {...},
    "ingredients": "100% Organic Apples",
    "allergens": "None",
    "isOrganic": true,
    "isVegan": true,
    "isGlutenFree": true,
    "relatedProducts": [...]
  }
}
```

### Search Products
```
GET /products/search?q=apple&category=fruits&filters={...}

Query Parameters:
- q: Search query
- category: Filter category
- filters: Additional filters

Response (200):
{
  "results": [...],
  "count": 25
}
```

### Add Product Review
```
POST /products/{productId}/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "title": "Great quality",
  "review": "Excellent product, fresh and tasty!"
}

Response (201):
{
  "review": {
    "id": "uuid",
    "rating": 5,
    "title": "Great quality",
    "review": "Excellent product, fresh and tasty!",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### Get Product Reviews
```
GET /products/{productId}/reviews?page=1&limit=10

Response (200):
{
  "reviews": [...],
  "pagination": {...}
}
```

---

## Categories Endpoints

### List Categories
```
GET /categories

Response (200):
{
  "categories": [
    {
      "id": "uuid",
      "name": "Fruits",
      "slug": "fruits",
      "icon": "🍎",
      "subcategories": [...]
    }
  ]
}
```

### Get Category Details
```
GET /categories/{categoryId}

Response (200):
{
  "category": {
    "id": "uuid",
    "name": "Fruits",
    "description": "Fresh fruits...",
    "icon": "🍎",
    "subcategories": [...],
    "productCount": 150
  }
}
```

### Get Category Products
```
GET /categories/{categoryId}/products?page=1&limit=20&sort=popular

Response (200):
{
  "products": [...],
  "pagination": {...}
}
```

---

## Cart Endpoints (Authenticated)

### Get Cart
```
GET /cart
Authorization: Bearer {token}

Response (200):
{
  "cart": {
    "id": "uuid",
    "items": [
      {
        "id": "uuid",
        "productId": "uuid",
        "name": "Organic Apples",
        "quantity": 2,
        "price": 249.99,
        "total": 499.98
      }
    ],
    "subtotal": 499.98,
    "tax": 89.99,
    "discount": 0,
    "total": 589.97
  }
}
```

### Add to Cart
```
POST /cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 2
}

Response (201):
{
  "message": "Item added to cart",
  "cart": {...}
}
```

### Update Cart Item
```
PUT /cart/items/{itemId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}

Response (200):
{
  "message": "Cart item updated",
  "cart": {...}
}
```

### Remove from Cart
```
DELETE /cart/items/{itemId}
Authorization: Bearer {token}

Response (200):
{
  "message": "Item removed from cart",
  "cart": {...}
}
```

### Apply Coupon
```
POST /cart/apply-coupon
Authorization: Bearer {token}
Content-Type: application/json

{
  "couponCode": "SAVE50"
}

Response (200):
{
  "message": "Coupon applied successfully",
  "discount": 150.00,
  "cart": {
    "subtotal": 499.98,
    "discount": 150.00,
    "tax": 56.00,
    "total": 405.98
  }
}
```

---

## Orders Endpoints (Authenticated)

### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ],
  "deliveryAddressId": "uuid",
  "paymentMethod": "razorpay",
  "deliverySlot": "09:00-12:00",
  "specialInstructions": "Please ring bell twice"
}

Response (201):
{
  "order": {
    "id": "uuid",
    "orderNumber": "QM-2024-00001",
    "status": "pending",
    "total": 589.97
  },
  "paymentRequired": true
}
```

### Get Orders
```
GET /orders?page=1&limit=10&status=delivered
Authorization: Bearer {token}

Query Parameters:
- page: Page number
- limit: Items per page
- status: Filter by status

Response (200):
{
  "orders": [...],
  "pagination": {...}
}
```

### Get Order Details
```
GET /orders/{orderId}
Authorization: Bearer {token}

Response (200):
{
  "order": {
    "id": "uuid",
    "orderNumber": "QM-2024-00001",
    "status": "shipped",
    "items": [...],
    "total": 589.97,
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### Get Order Tracking
```
GET /orders/{orderId}/tracking
Authorization: Bearer {token}

Response (200):
{
  "tracking": {
    "orderId": "uuid",
    "status": "out_for_delivery",
    "location": "Warehouse, Delhi",
    "estimatedDelivery": "2024-01-05",
    "updates": [
      {
        "timestamp": "2024-01-02T10:00:00Z",
        "status": "confirmed",
        "description": "Order confirmed"
      }
    ]
  }
}
```

### Cancel Order
```
POST /orders/{orderId}/cancel
Authorization: Bearer {token}

Response (200):
{
  "message": "Order cancelled successfully",
  "refund": {
    "amount": 589.97,
    "status": "processing"
  }
}
```

---

## Payment Endpoints (Authenticated)

### Initiate Payment
```
POST /payments/initiate
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "uuid",
  "amount": 589.97,
  "paymentMethod": "razorpay"
}

Response (200):
{
  "paymentId": "uuid",
  "orderId": "uuid",
  "amount": 589.97,
  "razorpayOrderId": "order_xxxxx",
  "razorpayKey": "key_xxxxx"
}
```

### Verify Payment
```
POST /payments/verify
Authorization: Bearer {token}
Content-Type: application/json

{
  "paymentId": "uuid",
  "razorpayPaymentId": "pay_xxxxx",
  "razorpaySignature": "signature_xxxxx"
}

Response (200):
{
  "message": "Payment verified successfully",
  "paymentId": "uuid",
  "status": "completed"
}
```

### Get Payment Details
```
GET /payments/{paymentId}
Authorization: Bearer {token}

Response (200):
{
  "payment": {
    "id": "uuid",
    "orderId": "uuid",
    "amount": 589.97,
    "status": "completed",
    "method": "razorpay",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

---

## User Profile Endpoints (Authenticated)

### Get Profile
```
GET /user/profile
Authorization: Bearer {token}

Response (200):
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+919876543210",
    "avatar": "url"
  }
}
```

### Update Profile
```
PUT /user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210"
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

### Get Addresses
```
GET /user/addresses
Authorization: Bearer {token}

Response (200):
{
  "addresses": [
    {
      "id": "uuid",
      "label": "Home",
      "street": "123 Main St",
      "city": "Delhi",
      "state": "Delhi",
      "postalCode": "110001",
      "isDefault": true
    }
  ]
}
```

### Add Address
```
POST /user/addresses
Authorization: Bearer {token}
Content-Type: application/json

{
  "label": "Office",
  "street": "456 Work Ave",
  "city": "Delhi",
  "state": "Delhi",
  "postalCode": "110002",
  "isDefault": false
}

Response (201):
{
  "message": "Address added successfully",
  "address": {...}
}
```

### Get Wishlist
```
GET /user/wishlist
Authorization: Bearer {token}

Response (200):
{
  "wishlist": [...]
}
```

### Add to Wishlist
```
POST /user/wishlist/{productId}
Authorization: Bearer {token}

Response (201):
{
  "message": "Product added to wishlist"
}
```

### Remove from Wishlist
```
DELETE /user/wishlist/{productId}
Authorization: Bearer {token}

Response (200):
{
  "message": "Product removed from wishlist"
}
```

---

## Admin Endpoints (Admin Only)

### Get Dashboard
```
GET /admin/dashboard
Authorization: Bearer {admin_token}

Response (200):
{
  "dashboard": {
    "sales": {
      "today": 50000,
      "thisWeek": 350000,
      "thisMonth": 1500000
    },
    "orders": {
      "pending": 45,
      "processing": 120,
      "delivered": 850
    },
    "inventory": {
      "lowStock": 25,
      "outOfStock": 5
    },
    "topProducts": [...]
  }
}
```

### Manage Products
```
# Create
POST /admin/products

# Update
PUT /admin/products/{productId}

# Delete
DELETE /admin/products/{productId}

# List
GET /admin/products?page=1&limit=20&search=apple
```

### Manage Orders
```
# List
GET /admin/orders?page=1&limit=20&status=pending

# Update Status
PUT /admin/orders/{orderId}/status
{
  "status": "shipped"
}
```

### Manage Coupons
```
# Create
POST /admin/coupons

# Update
PUT /admin/coupons/{couponId}

# Delete
DELETE /admin/coupons/{couponId}

# List
GET /admin/coupons
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": {
    "field": "error message"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required or invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "timestamp": "2024-01-01T10:00:00Z"
}
```

---

## Rate Limiting

API is rate-limited to 100 requests per 15 minutes per IP.

Headers:
- `X-RateLimit-Limit`: 100
- `X-RateLimit-Remaining`: 95
- `X-RateLimit-Reset`: 1234567890

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** Active
