[README.md](https://github.com/user-attachments/files/30046704/README.md)
# 🌲 HVOYA — Mirror Houses in the Forest

> *A glass cabin rental website built with Next.js — book your escape into nature.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://mirror-houses-six.vercel.app/)

---

## ✨ About

**HVOYA** is a glamping rental website for two mirror glass cabins and a barnhouse located 45 minutes from Minsk, Belarus. Guests can browse cabins, check availability, pick dates, add extras, apply promo codes, and submit a booking — all in one seamless single-page experience.

🔗 **Live site:** [mirror-houses-six.vercel.app](https://mirror-houses-six.vercel.app/)

---

## 📸 Preview

| Hero | Cabins | Booking |
|------|--------|---------|
| Full-screen forest background | 3 cabin cards with photos | Calendar + form + price calculator |

---

## 🏡 Cabins

| Name | Capacity | Price |
|------|----------|-------|
| 🌿 Берёзовый (Birch) | Up to 2 guests | from 330 BYN / night |
| 🌲 Еловый (Fir) | Up to 2 guests | from 330 BYN / night |
| 🏠 Барнхауз (Barnhouse) | Up to 8 guests | from 330 BYN / night |

---

## 🚀 Features

- **Single-page landing** — Hero, Cabins, Amenities, Gallery, Reviews, Booking, Map
- **Real-time availability calendar** — booked dates are blocked and highlighted
- **Booking form** — name, phone, email, cabin selection, date range picker
- **Add-ons** — hot tub (купель) +150 BYN with live price recalculation
- **Promo codes** — find them on Instagram, apply for instant discount
- **Email notifications** — guest receives confirmation, admin gets booking details (via Resend)
- **PostgreSQL database** — all bookings stored in Supabase
- **Responsive design** — mobile-first, burger menu, adaptive grid
- **SEO** — meta tags, OG image, favicon

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (Pages Router), CSS Modules |
| Database | PostgreSQL via Supabase |
| ORM | Prisma 5 |
| Email | Resend |
| Deployment | Vercel |
| Fonts | Playfair Display + Inter (Google Fonts) |

---

## 📁 Project Structure

```
mirror-houses/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Houses, Amenities, Gallery, Reviews, Booking, Map
│   └── ui/              # HouseCard, BookingForm, Calendar
├── pages/
│   ├── index.jsx        # Single page — all sections
│   └── api/
│       ├── bookings.js  # POST — create booking + send emails
│       ├── availability.js # GET — fetch booked dates
│       └── promo.js     # POST — validate promo code
├── prisma/
│   └── schema.prisma    # Booking + Promo models
├── lib/
│   └── prisma.js        # Prisma client singleton
├── public/
│   └── images/          # Cabin photos, gallery, amenities
└── styles/
    └── globals.css      # CSS variables, fonts, reset
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Resend account for emails

### Installation

```bash
# Clone the repository
git clone https://github.com/D3NTI/mirrorHouses.git
cd mirror-houses

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
RESEND_API_KEY="re_..."
ADMIN_EMAIL="your@email.com"
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Schema

```prisma
model Booking {
  id         Int      @id @default(autoincrement())
  name       String
  phone      String
  email      String
  house      String
  dateFrom   DateTime
  dateTo     DateTime
  kupel      Boolean  @default(false)
  totalPrice Int
  status     String   @default("pending")
  createdAt  DateTime @default(now())
}

model Promo {
  id        Int      @id @default(autoincrement())
  code      String   @unique
  discount  Int
  isActive  Boolean  @default(true)
  usedCount Int      @default(0)
  createdAt DateTime @default(now())
}
```

---

## 📦 Deployment

The project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Design

- **Color palette:** Forest green `#1a3220`, Moss `#7ab89a`, Accent amber `#c8893a`
- **Typography:** Playfair Display (headings) + Inter (body)
- **Style:** Minimal, nature-inspired, premium feel

---

## 📬 Contact

Built with ❤️ by **D3NTI**

- GitHub: [@D3NTI](https://github.com/D3NTI)
- Project: [mirror-houses-six.vercel.app](https://mirror-houses-six.vercel.app/)

---

*45 minutes from Minsk — and you're in a different world* 🌲
