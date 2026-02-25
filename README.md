# 💎 JEWELRY E-COMMERCE MVP – FULL EXECUTION SPEC
**Stack:** Next.js 14 (App Router) | PostgreSQL + Prisma | M-Pesa (Daraja API) | Cloudinary | Resend

---

## 1️⃣ STARTUP DEFINITION

**Product:** Jewelry E-Commerce Platform  
**Location:** Kenya (Phase 1)  
**Stack:** Next.js 14 fullstack (App Router + API Routes)  
**Payment:** M-Pesa STK Push via Safaricom Daraja API  
**Media:** Cloudinary (product images)  
**Email:** Resend (transactional emails)  
**Auth:** NextAuth.js (credentials + Google OAuth)

**Mission:** Let customers browse, filter, and purchase jewelry with M-Pesa, while the store owner manages everything from a clean admin dashboard.

---

## 2️⃣ USER ROLES

| Role | Access |
|------|--------|
| `CUSTOMER` | Browse, wishlist, checkout, order history |
| `ADMIN` | Full dashboard: products, orders, customers, analytics |

No vendor roles. No marketplace. Single store only.

---

## 3️⃣ FOLDER STRUCTURE

```
/
├── app/
│   ├── (store)/                   # Customer-facing pages
│   │   ├── page.tsx               # Homepage
│   │   ├── shop/page.tsx          # Product catalog
│   │   ├── shop/[slug]/page.tsx   # Product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── account/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx           # Dashboard overview
│   │       ├── products/page.tsx
│   │       ├── products/new/page.tsx
│   │       ├── products/[id]/page.tsx
│   │       ├── orders/page.tsx
│   │       ├── orders/[id]/page.tsx
│   │       ├── customers/page.tsx
│   │       └── analytics/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── products/route.ts
│   │   ├── products/[id]/route.ts
│   │   ├── cart/route.ts
│   │   ├── orders/route.ts
│   │   ├── orders/[id]/route.ts
│   │   ├── wishlist/route.ts
│   │   ├── reviews/route.ts
│   │   ├── coupons/validate/route.ts
│   │   ├── payments/mpesa/initiate/route.ts
│   │   ├── payments/mpesa/callback/route.ts
│   │   └── admin/
│   │       ├── products/route.ts
│   │       ├── orders/route.ts
│   │       ├── customers/route.ts
│   │       └── analytics/route.ts
│   └── layout.tsx
├── components/
│   ├── store/
│   ├── admin/
│   └── ui/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── mpesa.ts
│   ├── cloudinary.ts
│   ├── resend.ts
│   ├── validations.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── middleware.ts
└── .env.local
```

---

## 4️⃣ DATABASE SCHEMA (Prisma + PostgreSQL)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  phone         String?
  image         String?
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  addresses  Address[]
  orders     Order[]
  wishlist   WishlistItem[]
  reviews    Review[]
  accounts   Account[]
  sessions   Session[]

  @@index([email])
  @@index([role])
}

enum Role {
  CUSTOMER
  ADMIN
}

model Address {
  id         String  @id @default(cuid())
  userId     String
  user       User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  name       String
  phone      String
  county     String
  town       String
  street     String
  isDefault  Boolean @default(false)

  orders     Order[]
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  image       String?
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Decimal  @db.Decimal(10, 2)
  comparePrice Decimal? @db.Decimal(10, 2)
  stock       Int      @default(0)
  sku         String?  @unique
  material    String?
  weight      String?
  featured    Boolean  @default(false)
  isActive    Boolean  @default(true)
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  orderItems  OrderItem[]
  wishlistItems WishlistItem[]
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([categoryId])
  @@index([isActive])
  @@index([featured])
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  publicId  String
  alt       String?
  order     Int     @default(0)
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  addressId       String
  address         Address     @relation(fields: [addressId], references: [id])
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(UNPAID)
  paymentMethod   String      @default("MPESA")
  subtotal        Decimal     @db.Decimal(10, 2)
  shippingFee     Decimal     @db.Decimal(10, 2) @default(0)
  discount        Decimal     @db.Decimal(10, 2) @default(0)
  total           Decimal     @db.Decimal(10, 2)
  couponCode      String?
  notes           String?
  items           OrderItem[]
  payment         Payment?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([userId])
  @@index([status])
  @@index([paymentStatus])
  @@index([orderNumber])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  UNPAID
  PAID
  FAILED
  REFUNDED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  name      String
  image     String?
}

model Payment {
  id                String        @id @default(cuid())
  orderId           String        @unique
  order             Order         @relation(fields: [orderId], references: [id])
  provider          String        @default("MPESA")
  status            PaymentStatus @default(UNPAID)
  amount            Decimal       @db.Decimal(10, 2)
  phone             String
  checkoutRequestId String?
  merchantRequestId String?
  mpesaReceiptNumber String?
  resultCode        Int?
  resultDesc        String?
  transactionDate   DateTime?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  @@index([checkoutRequestId])
  @@index([orderId])
}

model WishlistItem {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  rating    Int      // 1-5
  comment   String?
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
  @@index([productId])
}

model Coupon {
  id            String      @id @default(cuid())
  code          String      @unique
  type          CouponType
  value         Decimal     @db.Decimal(10, 2)
  minOrderValue Decimal?    @db.Decimal(10, 2)
  maxUses       Int?
  usedCount     Int         @default(0)
  expiresAt     DateTime?
  isActive      Boolean     @default(true)
  createdAt     DateTime    @default(now())

  @@index([code])
}

enum CouponType {
  PERCENTAGE
  FIXED
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## 5️⃣ API CONTRACTS

### Auth
```
POST   /api/auth/register          Body: { name, email, password, phone }
POST   /api/auth/[...nextauth]     NextAuth handler (login, session, etc.)
```

### Products (Public)
```
GET    /api/products               Query: ?category=&search=&minPrice=&maxPrice=&sort=&page=
GET    /api/products/[id]          Single product by slug or id
```

### Cart (Session-based, no DB)
```
GET    /api/cart                   Read cart from session/cookie
POST   /api/cart                   Add item { productId, quantity }
PATCH  /api/cart                   Update quantity { productId, quantity }
DELETE /api/cart                   Remove item { productId }
```

### Orders
```
POST   /api/orders                 Create order (auth required)
GET    /api/orders                 Customer's orders (auth required)
GET    /api/orders/[id]            Single order detail (auth required)
```

### Payments
```
POST   /api/payments/mpesa/initiate   Body: { orderId, phone }
POST   /api/payments/mpesa/callback   Safaricom callback (no auth – whitelist IP)
```

### Wishlist
```
GET    /api/wishlist               Auth required
POST   /api/wishlist               Body: { productId }
DELETE /api/wishlist/[productId]   Remove from wishlist
```

### Reviews
```
POST   /api/reviews                Auth required. Body: { productId, rating, comment }
GET    /api/reviews?productId=     Public
```

### Coupons
```
POST   /api/coupons/validate       Body: { code, orderTotal }
```

### Admin (All require ADMIN role)
```
GET    /api/admin/products         Paginated list
POST   /api/admin/products         Create product
PATCH  /api/admin/products/[id]    Update product
DELETE /api/admin/products/[id]    Delete product

GET    /api/admin/orders           Paginated + filter by status
PATCH  /api/admin/orders/[id]      Update status

GET    /api/admin/customers        Paginated
GET    /api/admin/analytics        Revenue, orders, top products, conversion
```

---

## 6️⃣ M-PESA INTEGRATION (Daraja STK Push)

```typescript
// lib/mpesa.ts

const MPESA_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

export async function getMpesaToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token;
}

export async function initiateSTKPush({
  phone,
  amount,
  orderId,
}: {
  phone: string;
  amount: number;
  orderId: string;
}) {
  const token = await getMpesaToken();
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  // Format phone: 0712345678 → 254712345678
  const formattedPhone = phone.startsWith("0")
    ? `254${phone.slice(1)}`
    : phone;

  const body = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.ceil(amount),
    PartyA: formattedPhone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: formattedPhone,
    CallBackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/mpesa/callback`,
    AccountReference: orderId,
    TransactionDesc: "Jewelry Purchase",
  };

  const res = await fetch(
    `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return res.json();
}
```

**Callback handler:**
```typescript
// app/api/payments/mpesa/callback/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const { Body } = body;

  if (Body.stkCallback.ResultCode === 0) {
    // Payment successful
    const metadata = Body.stkCallback.CallbackMetadata.Item;
    const receipt = metadata.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
    const checkoutRequestId = Body.stkCallback.CheckoutRequestID;

    await prisma.payment.update({
      where: { checkoutRequestId },
      data: {
        status: "PAID",
        mpesaReceiptNumber: receipt,
        resultCode: 0,
        resultDesc: Body.stkCallback.ResultDesc,
        transactionDate: new Date(),
      },
    });

    await prisma.order.update({
      where: { payment: { checkoutRequestId } },
      data: { paymentStatus: "PAID", status: "CONFIRMED" },
    });

    // Trigger confirmation email
    await sendOrderConfirmationEmail(checkoutRequestId);
  } else {
    // Payment failed
    await prisma.payment.update({
      where: { checkoutRequestId: Body.stkCallback.CheckoutRequestID },
      data: {
        status: "FAILED",
        resultCode: Body.stkCallback.ResultCode,
        resultDesc: Body.stkCallback.ResultDesc,
      },
    });
  }

  return Response.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
```

---

## 7️⃣ AUTHENTICATION (NextAuth)

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as Role;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
};
```

---

## 8️⃣ MIDDLEWARE (Route Protection)

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin route protection
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/admin")) return token?.role === "ADMIN";
        if (pathname.startsWith("/orders") || pathname.startsWith("/account")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/orders/:path*", "/account/:path*", "/checkout"],
};
```

---

## 9️⃣ SECURITY CHECKLIST

| Requirement | Implementation |
|-------------|---------------|
| Password hashing | `bcrypt` (salt rounds: 12) |
| Auth | `NextAuth.js` JWT strategy |
| Role protection | Middleware + API-level role checks |
| Input validation | `zod` on all API routes |
| Rate limiting | `upstash/ratelimit` or `next-rate-limit` |
| Security headers | `next.config.js` headers config |
| Environment secrets | `.env.local` only — never committed |
| Image uploads | Cloudinary signed uploads only |
| M-Pesa callback | IP whitelist Safaricom's IPs |
| SQL injection | Not applicable — Prisma parameterizes all queries |
| XSS | Next.js escapes by default; sanitize review text |

---

## 🔟 VALIDATION (Zod)

```typescript
// lib/validations.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().regex(/^(07|01)\d{8}$/, "Invalid Kenyan phone number"),
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().cuid(),
  material: z.string().optional(),
  featured: z.boolean().default(false),
});

export const orderSchema = z.object({
  addressId: z.string().cuid(),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export const checkoutSchema = z.object({
  orderId: z.string(),
  phone: z.string().regex(/^(07|01|2547|2541)\d{8}$/, "Invalid phone number"),
});

export const reviewSchema = z.object({
  productId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});
```

---

## 1️⃣1️⃣ ENVIRONMENT VARIABLES

```bash
# .env.local

# App
NEXT_PUBLIC_BASE_URL=https://yourdomain.co.ke
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/jewelry_db

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://yourdomain.co.ke

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# M-Pesa (Daraja)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=174379
MPESA_PASSKEY=
MPESA_ENV=sandbox  # change to production when live

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (Email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=orders@yourdomain.co.ke

# Upstash (Rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 1️⃣2️⃣ PAGES & COMPONENTS BREAKDOWN

### Customer Pages

| Page | Key Components |
|------|---------------|
| `/` | Hero, FeaturedProducts, CategoryGrid, Testimonials |
| `/shop` | ProductGrid, FilterSidebar, SearchBar, SortDropdown, Pagination |
| `/shop/[slug]` | ProductImages, ProductInfo, AddToCart, Reviews, RelatedProducts |
| `/cart` | CartItems, CartSummary, CouponInput, CheckoutButton |
| `/checkout` | AddressForm, OrderSummary, MpesaPaymentForm |
| `/orders` | OrderList, OrderCard, OrderStatusBadge |
| `/orders/[id]` | OrderDetail, TrackingInfo, PaymentInfo |
| `/wishlist` | WishlistGrid, MoveToCart |
| `/account` | ProfileForm, AddressBook, ChangePassword |

### Admin Pages

| Page | Key Components |
|------|---------------|
| `/admin` | StatsCards, RecentOrders, RevenueChart, LowStockAlert |
| `/admin/products` | ProductTable, SearchBar, CategoryFilter, BulkActions |
| `/admin/products/new` | ProductForm, ImageUploader, CategorySelect |
| `/admin/products/[id]` | ProductForm (pre-filled), StockManager |
| `/admin/orders` | OrderTable, StatusFilter, DateRangePicker |
| `/admin/orders/[id]` | OrderDetail, StatusUpdater, CustomerInfo |
| `/admin/customers` | CustomerTable, CustomerDetail |
| `/admin/analytics` | RevenueChart, TopProducts, SalesTable, ExportCSV |

---

## 1️⃣3️⃣ CART STRATEGY

Use server-side session with cookies for guest cart, merge with DB on login.

```typescript
// Simple cookie-based cart (no DB required)
// lib/cart.ts

export type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
};

// Store cart in encrypted HTTP-only cookie
// Use next-auth session for user-specific data
// On checkout: validate all prices + stock against DB (never trust client)
```

**Critical:** Always re-validate price and stock from DB at checkout time. Never trust what the client sends.

---

## 1️⃣4️⃣ EMAIL NOTIFICATIONS (Resend)

Send these transactional emails:

| Trigger | Email |
|---------|-------|
| Registration | Welcome email |
| Order created | Order confirmation with items + total |
| Payment confirmed | Receipt with M-Pesa transaction number |
| Order shipped | Shipping notification |
| Order delivered | Delivery confirmation + review request |
| Password reset | Reset link (NextAuth handles) |

```typescript
// lib/resend.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: Order, user: User) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: user.email,
    subject: `Order Confirmed – #${order.orderNumber}`,
    react: OrderConfirmationEmail({ order, user }),
  });
}
```

---

## 1️⃣5️⃣ SHIPPING LOGIC

Simple flat-rate for Kenya Phase 1:

```typescript
// lib/shipping.ts
const NAIROBI_COUNTIES = ["Nairobi"];

export function calculateShipping(county: string, subtotal: number): number {
  // Free shipping over KES 5,000
  if (subtotal >= 5000) return 0;
  
  if (NAIROBI_COUNTIES.includes(county)) return 200;
  return 400; // Other counties
}
```

Expand to courier API integration (Sendy, Fargo) in Phase 2.

---

## 1️⃣6️⃣ IMAGE MANAGEMENT (Cloudinary)

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadProductImage(file: string, productId: string) {
  return cloudinary.uploader.upload(file, {
    folder: `jewelry/products/${productId}`,
    transformation: [
      { width: 800, height: 800, crop: "fill", gravity: "auto" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });
}

export async function deleteProductImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
```

---

## 1️⃣7️⃣ ANALYTICS (Admin)

Track these metrics from Day 1:

- Total revenue (daily, weekly, monthly)
- Total orders + order count by status
- Average order value
- Top 5 selling products
- Revenue by category
- Customer count (new vs returning)
- Conversion funnel (views → cart → checkout → paid)

Store product views in a lightweight `ProductView` table or use Vercel Analytics.

---

## 1️⃣8️⃣ NON-FUNCTIONAL REQUIREMENTS

| Requirement | Target |
|-------------|--------|
| Page load (LCP) | < 2.5s |
| API response time | < 500ms |
| Image optimization | Next.js `<Image />` + Cloudinary auto-format |
| Mobile responsive | 100% — most Kenyan users are on mobile |
| SEO | Static product pages with `generateMetadata` |
| Error handling | Global error boundary + API error responses with codes |
| Logging | Console in dev, structured logs in prod |
| Security headers | HSTS, X-Frame-Options, CSP via `next.config.js` |

---

## 1️⃣9️⃣ LAUNCH CHECKLIST

### Before Going Live
- [ ] All env variables set in production
- [ ] M-Pesa switched from sandbox to production credentials
- [ ] Safaricom callback URL whitelisted
- [ ] Database migrations run (`prisma migrate deploy`)
- [ ] Admin account seeded
- [ ] SSL certificate active (HTTPS required for M-Pesa)
- [ ] Test full purchase flow on real phone
- [ ] Test callback with real M-Pesa payment
- [ ] Images optimized + loading states working
- [ ] 404 and error pages built
- [ ] Email delivery tested
- [ ] Rate limiting tested

### MVP Success Criteria
- 10 products listed with real images
- 5 real customer orders placed
- 3 successful M-Pesa payments processed
- Admin can manage orders end-to-end
- Zero payment failures from system errors

---

## 2️⃣0️⃣ WHAT WILL KILL THIS PROJECT

- Skipping input validation on API routes (price manipulation)
- Trusting client-sent prices at checkout (always re-fetch from DB)
- Not testing M-Pesa callback thoroughly before launch
- No loading/error states on the payment flow (customers will think it broke)
- Uploading images without size limits (storage costs spiral)
- Storing secrets in code or committing `.env` to git
- Over-designing before first sale

---

## 2️⃣1️⃣ TECH STACK SUMMARY

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Railway or Supabase |
| ORM | Prisma |
| Auth | NextAuth.js v4 |
| Payments | Safaricom Daraja API (M-Pesa STK Push) |
| Images | Cloudinary |
| Email | Resend |
| Validation | Zod |
| Rate Limiting | Upstash Redis |
| Styling | Tailwind CSS |
| State | Zustand (cart) + React Query (server state) |
| Deployment | Vercel (frontend) + Railway/Supabase (DB) |

---

*Built for Kenya. Mobile-first. M-Pesa native. Ship fast, iterate faster.*