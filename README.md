# Ramayan Tours and Travels 🕉️

A premium travel booking platform specializing in spiritual and religious tourism across India. Built with modern web technologies to provide seamless pilgrimage experiences.

## 🌟 Features

### 🏛️ Spiritual Destinations
- Curated selection of sacred Hindu pilgrimage sites
- Detailed temple information and rituals
- Best travel times and seasonal guidance
- High-quality imagery and descriptions

### 📦 Tour Packages
- Multiple package tiers (Budget, Premium, Luxury)
- Hotel accommodations and transport
- Customizable itineraries
- Transparent pricing with no hidden fees

### 🤖 AI Travel Planner
- Intelligent trip planning powered by AI
- Personalized recommendations
- Real-time availability checking
- Custom itinerary generation

### 📱 Modern User Experience
- Responsive design for all devices
- Interactive chatbot support
- WhatsApp integration
- Real-time booking confirmations

### 👨‍💼 Admin Dashboard
- Complete booking management
- Destination and package management
- Review moderation
- Analytics and reporting

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type-safe development
- **TailwindCSS** - Modern styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **PostgreSQL** - Robust database
- **Prisma ORM** - Type-safe database access
- **Next.js API Routes** - Serverless backend
- **Node.js** - Runtime environment

### Deployment
- **Docker** - Containerization
- **Vercel** - Hosting platform
- **Environment-based configuration**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "ramayan-tours-and-travels"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ramayan_tours"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: For image hosting
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed sample data
npm run seed
```

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 app router
│   ├── admin/             # Admin dashboard
│   ├── ai-planner/        # AI travel planner
│   ├── booking/           # Booking pages
│   ├── destinations/      # Destination pages
│   └── packages/          # Package pages
├── components/            # Reusable React components
│   ├── ChatBot.tsx       # AI chatbot
│   ├── Navbar.tsx        # Navigation
│   └── Footer.tsx        # Footer
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── data.ts           # Static data
│   └── actions/          # Server actions
└── middleware.ts          # Next.js middleware
```

## 🏗️ Database Schema

### Core Models
- **User** - Authentication and user management
- **Destination** - Spiritual destinations and temples
- **Package** - Tour packages with pricing
- **Booking** - Booking management and tracking
- **Review** - User reviews and ratings
- **ContactMessage** - Customer inquiries

## 🐳 Docker Deployment

```bash
# Build the image
docker build -t ramayan-tours .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  ramayan-tours
```

## 🌐 Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on git push

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Business Model

### Revenue Streams
- **Package Bookings** - Commission on tour packages
- **Premium Services** - Customized AI planning
- **Hotel Partnerships** - Affiliate commissions
- **Transport Services** - Taxi and vehicle bookings

### Target Market
- Spiritual tourists and pilgrims
- Family groups seeking religious experiences
- International tourists interested in Indian culture
- Corporate spiritual retreats

## 🎯 Key Selling Points

### For Buyers
- **Ready-to-deploy** - Fully functional and tested
- **Scalable Architecture** - Built for growth
- **Modern Tech Stack** - Latest frameworks and practices
- **Complete Admin Panel** - Full business management
- **AI Integration** - Future-proof technology

### Technical Highlights
- **Type-safe** - Full TypeScript coverage
- **SEO Optimized** - Next.js SSR capabilities
- **Mobile Responsive** - Works on all devices
- **Performance Optimized** - Fast loading times
- **Secure** - Best security practices

## 🔧 Customization

### Adding New Destinations
1. Update `prisma/schema.prisma`
2. Add destination data to `src/lib/data.ts`
3. Create new pages in `src/app/destinations/`

### Modifying Packages
1. Update package schema
2. Modify pricing in database
3. Update admin panel components

### Brand Customization
1. Update colors in `tailwind.config.js`
2. Modify logo and branding in components
3. Customize content in data files

## 📞 Support

For technical support or customization requests:
- Email: support@ramayantours.com
- Documentation: Available in `/docs`
- Community: Join our Discord server

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see CONTRIBUTING.md for guidelines.

---

**Built with ❤️ for spiritual travelers across the world**
