# Database Schema Documentation

Complete documentation of the Quickmart database schema for PostgreSQL 14+.

## Table Relationships

```
Users
├── Carts (1:N)
├── Orders (1:N)
├── Addresses (1:N)
├── Reviews (1:N)
├── Wishlists (1:N)
├── LoyaltyPoints (1:N)
└── ActivityLogs (1:N)

Products
├── ProductImages (1:N)
├── CartItems (1:N)
├── OrderItems (1:N)
├── Reviews (1:N)
├── Wishlists (1:N)
└── Category (N:1)

Orders
├── OrderItems (1:N)
├── Payments (1:N)
├── User (N:1)
└── DeliveryAddress (N:1)

Categories
├── Products (1:N)
└── ParentCategory (N:1)

Coupons
└── Orders (N:M - via coupon_code)
```

## Key Tables

### Users
Stores user account information.

**Key Fields:**
- `id`: UUID primary key
- `email`: Unique email address
- `phone`: Phone number for SMS
- `password_hash`: Bcrypt hashed password
- `social_login_id`: OAuth integration
- `email_verified`: Email verification status
- `last_login`: Track user activity

### Products
Core product information.

**Key Fields:**
- `sku`: Stock keeping unit
- `name`: Product name (indexed for search)
- `price`: Base selling price
- `discount_price`: Discounted price
- `stock_quantity`: Available inventory
- `rating`: Average product rating
- `is_organic`, `is_vegan`: Dietary information
- `nutritional_info`: JSONB for flexible storage

### Categories
Product categorization with hierarchy support.

**Features:**
- Hierarchical structure (parent_category_id)
- Slug for URL-friendly names
- Support for subcategories
- Display order for sorting

### Carts
Shopping cart management.

**Features:**
- Persistent carts (30-day expiry default)
- Automatic cleanup of expired carts
- Real-time inventory sync

### Orders
Order management and tracking.

**Status Workflow:**
- pending → confirmed → processing → shipped → delivered
- Special paths: cancelled, refunded

**Payment Status:**
- pending → completed/failed/refunded

### Payments
Payment transaction records.

**Supported Gateways:**
- Razorpay
- Stripe
- PayPal
- UPI
- Net Banking
- Wallet
- Cash on Delivery (COD)

**Features:**
- Secure transaction storage
- Refund management
- Error logging

### Reviews
Product reviews and ratings.

**Features:**
- 1-5 star ratings
- Verified purchase flag
- Moderation workflow
- Helpful/unhelpful counts

### Addresses
Delivery address management.

**Features:**
- Multiple addresses per user
- Latitude/longitude for delivery mapping
- Address type classification
- Default address selection

### Coupons
Discount code management.

**Features:**
- Percentage and fixed amount discounts
- Usage limits and per-user limits
- Category and product-specific coupons
- Date range validation
- Minimum order value requirements

### Wishlists
Save products for later.

**Features:**
- User-specific wishlist
- Quick add-to-cart from wishlist

### LoyaltyPoints
Rewards and points program.

**Features:**
- Earn points from purchases
- Redeem for discounts
- Expiration tracking
- Transaction history

### GiftCards
Digital gift card system.

**Features:**
- Unique gift card numbers
- Balance tracking
- Expiration dates
- Recipient information

### DeliveryZones
Geographical delivery management.

**Features:**
- Zone-based delivery charges
- Postal code mapping
- Free delivery thresholds
- Delivery time estimates

### ActivityLogs
User activity tracking for analytics.

**Logged Actions:**
- Product views
- Cart updates
- Order placements
- Login attempts

## Indexes

### Performance Indexes
- Email and phone lookups (login)
- Product search (full-text on name)
- Category and brand filtering
- Order status and user queries
- Payment transaction lookups

### Optimization Strategies
- Gin indexes for text search
- Foreign key indexes
- Composite indexes for common WHERE clauses
- Covering indexes where applicable

## Data Types

### Numeric
- `DECIMAL(10, 2)`: Prices (avoids floating-point errors)
- `INTEGER`: Quantities and counts
- `DECIMAL(3, 2)`: Ratings (0.00 - 5.00)

### Text
- `VARCHAR(n)`: Fixed-length strings
- `TEXT`: Variable-length text (descriptions)
- `VARCHAR[]`: Arrays (for category lists)

### Spatial
- `DECIMAL(10, 8)`: Latitude/Longitude

### JSON
- `JSONB`: Product nutritional info, payment responses

## Triggers

Automatic `updated_at` timestamp updates on:
- users
- products
- orders
- payments
- carts

## Constraints

### Data Integrity
- Unique: email, phone (with nullable), SKU, order number
- Check: rating between 1-5
- Foreign keys with CASCADE delete for dependent records
- NOT NULL for critical fields

## Backup Strategy

### Full Backup
```bash
pg_dump -U user -d quickmart_db > backup.sql
```

### Incremental Backup
Use WAL archiving for continuous replication.

## Query Optimization

### Common Queries

#### User Login
```sql
SELECT * FROM users WHERE email = $1;
```

#### Product Listing with Filters
```sql
SELECT p.* FROM products p
WHERE p.category_id = $1
  AND p.price BETWEEN $2 AND $3
  AND p.is_active = true
ORDER BY p.rating DESC
LIMIT 20 OFFSET $4;
```

#### User Orders with Items
```sql
SELECT o.*, oi.*, p.name FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.user_id = $1
ORDER BY o.created_at DESC;
```

## Maintenance

### Regular Tasks
1. **Vacuum**: `VACUUM ANALYZE;` (automatic)
2. **Index Maintenance**: Monitor bloat with `pgstattuple`
3. **Statistics**: `ANALYZE;` updates query planner stats
4. **Archival**: Move old order data to archive tables

### Monitoring
- Table sizes
- Index usage
- Query performance
- Slow query logs

## Security

### Column-Level Security
- Password hashes (bcrypt)
- Payment data (encrypted)
- PII (email, phone) - access logs

### Row-Level Security (RLS)
Enable for multi-tenant scenarios:
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_orders ON orders
  FOR SELECT USING (user_id = current_user_id());
```

## Scaling Considerations

### Partitioning
As data grows, partition tables:
```sql
-- Partition orders by date
CREATE TABLE orders_2024_q1 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
```

### Read Replicas
Set up read-only replicas for analytics/reporting.

### Caching
Use Redis for:
- User sessions
- Cart data
- Product catalog
- Search results

## Extension Requirements

```sql
CREATE EXTENSION "uuid-ossp";  -- UUID generation
CREATE EXTENSION "pg_trgm";    -- Text search optimization
```

Optional extensions:
```sql
CREATE EXTENSION "postgis";     -- Geospatial queries (delivery mapping)
CREATE EXTENSION "pg_stat_statements"; -- Query analytics
```
