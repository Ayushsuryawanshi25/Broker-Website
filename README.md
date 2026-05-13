# Shivaay Enterprises - Real Estate Broker Website

A modern, SEO-optimized real estate broker website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, mobile-first design, and production-ready performance.

## 🚀 Features

- ✅ **SEO Optimized** - Server-side rendering with comprehensive meta tags
- ✅ **Fast & Performant** - Optimized images, code splitting, and compression
- ✅ **Mobile First** - Responsive design that works on all devices
- ✅ **Beautiful Animations** - Smooth Framer Motion animations throughout
- ✅ **Modern UI** - Clean, professional design with Tailwind CSS
- ✅ **Accessible** - Semantic HTML and ARIA labels
- ✅ **Contact Form** - Integrated contact form for lead generation
- ✅ **Office Gallery** - Dedicated section for office photos

## 📋 Sections

1. **Hero Section** - Eye-catching introduction with CTAs
2. **About Section** - Information about Satish Rai and Shivaay Enterprises
3. **Services Section** - Comprehensive list of real estate services
4. **Office Gallery** - Professional office photos
5. **Contact Section** - Contact form and information
6. **Footer** - Quick links and contact details

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image Component

## 📦 Installation

1. Navigate to the project directory:
```bash
cd shivaay-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📤 Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `out` directory contains your static files (if using `output: 'export'`)
   OR deploy the `.next` folder with Node.js server

3. Upload to your hosting provider

### Option 3: Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t shivaay-website .
docker run -p 3000:3000 shivaay-website
```

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_SITE_URL=https://www.shivaayenterprises.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### SEO Configuration

Update the following in `app/layout.tsx`:
- Meta title and description
- Open Graph tags
- Google verification code
- Site URL

### Contact Form Integration

To make the contact form functional, integrate with a backend service:

**Option 1: Form API Services**
- [Formspree](https://formspree.io)
- [Web3Forms](https://web3forms.com)
- [Basin](https://usebasin.com)

**Option 2: Custom Backend**
- Create API route in `app/api/contact/route.ts`
- Use email services like SendGrid, Mailgun, or Nodemailer

Example using Web3Forms:
```tsx
const form = e.currentTarget;
const formData = new FormData(form);
formData.append('access_key', 'YOUR_WEB3FORMS_KEY');

const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  body: formData
});
```

## 📱 Mobile Menu

To add a mobile menu, install a package or create a custom hamburger menu:

```bash
npm install react-burger-menu
```

Or use the built-in Tailwind CSS utilities for a custom implementation.

## 🎨 Customization

### Colors

Update colors in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#ea580c', // orange-600
        // Add more shades
      }
    }
  }
}
```

### Fonts

Change fonts in `app/layout.tsx`:
```typescript
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});
```

## 📊 Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ Font optimization with next/font
- ✅ Gzip compression enabled
- ✅ Lazy loading for animations

## 🔍 SEO Checklist

- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Sitemap (`/sitemap.xml`)
- [x] Robots.txt (`/robots.txt`)
- [x] Semantic HTML (h1, h2, etc.)
- [x] Alt text for images
- [ ] Google Analytics (add your ID)
- [ ] Google Search Console verification
- [ ] Schema.org markup (optional)

## 📝 To-Do After Deployment

1. **Add Google Analytics:**
   - Get tracking ID from Google Analytics
   - Add to `app/layout.tsx`

2. **Verify with Google Search Console:**
   - Add verification meta tag
   - Submit sitemap

3. **Set up Contact Form:**
   - Integrate with email service
   - Test form submissions

4. **Add Real Content:**
   - Update contact email
   - Add actual office address
   - Update service descriptions

5. **Mobile Menu:**
   - Implement hamburger menu for mobile devices

## 📞 Contact

**Shivaay Enterprises**  
Proprietor: Satish Rai  
Phone: 73899-22337 | 87702-24807  
Email: contact@shivaayenterprises.com

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ for Shivaay Enterprises
