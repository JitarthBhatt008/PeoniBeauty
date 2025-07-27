# Peoni Beauty - Korean Cosmetics Store

A modern, responsive website for a Korean cosmetics online store that manages orders through Instagram DMs. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 **Beautiful 3D Animated Landing Page** - Attractive hero section with animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🛍️ **Product Catalog** - Browse and search Korean beauty products
- 🏷️ **Category Filtering** - Filter products by category
- 🔍 **Search Functionality** - Search products by name, brand, or description
- 📸 **Product Carousel** - Dynamic carousel showcasing featured products
- 💬 **Instagram Integration** - Direct links to Instagram DM for ordering
- 🔧 **Admin Dashboard** - Manage products, categories, and carousel images
- ⚡ **Real-time Data** - Powered by Supabase with React Query
- 🎯 **No User Authentication** - Simple, direct ordering via Instagram

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd peoni-blossom-glow-shop-main
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update the Supabase configuration in `src/integrations/supabase/client.ts`:

```typescript
const SUPABASE_URL = "your-project-url";
const SUPABASE_PUBLISHABLE_KEY = "your-anon-key";
```

### 4. Database Setup

1. Run the migration to create tables:
```bash
npx supabase db push
```

2. **Fix RLS Policies** (Important!):
   Since this app doesn't use authentication, you need to either:
   
   **Option A: Disable RLS (Recommended for simple apps)**
   ```sql
   -- Run this in your Supabase SQL editor
   ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
   ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
   ALTER TABLE public.carousel_images DISABLE ROW LEVEL SECURITY;
   ```
   
   **Option B: Update RLS Policies**
   ```sql
   -- Run the migration file: supabase/migrations/20250727052617-fix-rls-policies.sql
   -- Or copy its contents to your Supabase SQL editor
   ```

3. Seed the database with sample data:
```bash
# Copy the contents of scripts/seed-data.sql and run it in your Supabase SQL editor
```

### 5. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 6. Update Instagram Handle

Update your Instagram handle in the configuration:

**Option A: Use the script (Recommended)**
```bash
node scripts/update-instagram-handle.js your_instagram_handle
# Example: node scripts/update-instagram-handle.js peoni_beauty
```

**Option B: Manual update**
Edit `src/config/social.ts` and replace `peoni_beauty` with your actual Instagram handle.

### 7. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   └── ProductCarousel.tsx # Product carousel
├── hooks/              # Custom React hooks
│   ├── use-products.ts # Product data hooks
│   ├── use-categories.ts # Category data hooks
│   └── use-carousel.ts # Carousel data hooks
├── integrations/       # External integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Products.tsx    # Products catalog
│   └── Admin.tsx       # Admin dashboard
├── services/           # API services
│   └── api.ts          # Supabase API functions
└── assets/             # Static assets
```

## Database Schema

### Tables

1. **categories** - Product categories
   - id (UUID, Primary Key)
   - name (Text)
   - slug (Text, Unique)
   - created_at, updated_at

2. **products** - Product information
   - id (UUID, Primary Key)
   - name (Text)
   - brand (Text)
   - price (Integer)
   - original_price (Integer, Nullable)
   - category_id (UUID, Foreign Key)
   - description (Text, Nullable)
   - image (Text, Nullable)
   - rating (Decimal)
   - tags (Text Array)
   - created_at, updated_at

3. **carousel_images** - Carousel images
   - id (UUID, Primary Key)
   - url (Text)
   - alt (Text, Nullable)
   - order_index (Integer)
   - created_at, updated_at

## Features in Detail

### Landing Page
- Hero section with animated elements
- Feature highlights (No customs, Fast delivery, Personal consultation)
- Product carousel
- Call-to-action sections

### Products Page
- Product grid with filtering
- Search functionality
- Category filtering
- Product cards with images, ratings, and prices
- Direct Instagram DM integration for ordering

### Admin Dashboard
- Product management (CRUD operations)
- Category management
- Carousel image management
- Real-time data updates

### Instagram Integration
- Direct links to Instagram DM
- Pre-filled messages with product information
- No complex checkout process - orders managed via Instagram

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update CSS variables in `src/index.css`
- Customize component styles in individual files

### Content
- Update product information in the admin dashboard
- Modify carousel images and content
- Update Instagram links and messaging

### Branding
- Replace logo and brand colors
- Update product images
- Modify copy and messaging

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Other Platforms
- Build the project: `npm run build`
- Deploy the `dist` folder to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact via Instagram DM or create an issue in the repository.

---

**Note**: This is a frontend-only application designed for Instagram-based ordering. All orders are managed through Instagram DMs as specified in the requirements.
# PeoniBeauty
# PeoniBeauty
