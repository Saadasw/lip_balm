# লিপ জেল শপ - LipGel Shop Dhaka

A modern, mobile-first e-commerce website for premium lip care products in Dhaka, Bangladesh.

## Features

- 🌟 **Modern Dark Gradient Design** - Beautiful dark blue-to-green gradient with glassmorphism effects
- 📱 **Mobile-First Responsive** - Optimized for all device sizes
- 🛍️ **Product Catalog** - Browse and filter lip balm products
- 💬 **WhatsApp Integration** - Direct ordering via WhatsApp
- 🎨 **Bengali Typography** - Beautiful Bengali font support
- ⚡ **Fast Performance** - Built with Next.js 15 and React 19

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Supabase
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Saadasw/lip_balm.git
cd lip_balm
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Create a new Supabase project
2. Run the SQL scripts in the `scripts/` directory:
   - `001_create_products_table.sql`
   - `002_seed_products.sql`
   - `003_add_winter_offer_price.sql`

## Project Structure

```
lip-balm-shop/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Custom components
├── lib/                  # Utility functions
│   ├── supabase/         # Supabase client
│   └── types.ts          # TypeScript types
├── public/               # Static assets
├── scripts/              # Database scripts
└── styles/               # Additional styles
```

## Features

### Product Management
- View all lip balm products
- Search and filter products
- Price range filtering
- Sort by price (low to high, high to low)

### Mobile Optimization
- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized performance for mobile devices
- Progressive Web App ready

### Design System
- Dark gradient theme with blue-to-green colors
- Glassmorphism effects
- Circuit board patterns and abstract shapes
- Bengali typography support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **WhatsApp**: +880 1234-567890
- **Location**: Dhaka, Bangladesh
- **GitHub**: [@Saadasw](https://github.com/Saadasw)

---

Made with ❤️ in Dhaka, Bangladesh
