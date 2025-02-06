# SSC Landing Page

A modern, responsive business website built with Next.js and enhanced with beautiful animations. This project showcases a professional business landing page with various sections including hero, services, testimonials, and more.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (React Framework)
- **Styling:** 
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
  - [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth, performant animations
- **Backend:** Next.js API Routes for serverless backend functionality
  - Built-in API routing with Next.js
  - RESTful API endpoints
  - Server-side data handling
  - Efficient data fetching with built-in caching
  - API route middleware support
- **UI Components:**
  - [Radix UI](https://www.radix-ui.com/) for headless UI components
  - [Lucide Icons](https://lucide.dev/) for beautiful icons
- **Form Handling:** 
  - React Hook Form
  - Zod for validation
- **Additional Features:**
  - Responsive design
  - Modern animations and transitions
  - Carousel/slider functionality with Embla Carousel

## ✨ Features

- Responsive navigation bar
- Hero section with engaging animations
- Services showcase
- Global presence visualization
- Testimonial slider
- Story numbers/statistics display
- Certified banner section
- Dark mode support
- Modern UI/UX design
- Optimized performance

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── hero-section.tsx
│   ├── nav-bar.tsx
│   ├── services-section.tsx
│   ├── testimonial-slider.tsx
│   └── ...
├── public/             # Static assets
└── styles/            # Global styles
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and add any required environment variables.

## 🖥️ Backend Architecture

The backend is implemented using Next.js API Routes, providing a serverless architecture that's both powerful and easy to deploy:

### API Routes Structure
```
├── app/
│   ├── api/
│   │   ├── nav-hero/
│   │   │   └── route.ts        # Navigation and hero section data
│   │   ├── our-story/
│   │   │   └── route.ts        # Company story and history
│   │   ├── regional-allocation/
│   │   │   └── route.ts        # Regional presence data
│   │   ├── services/
│   │   │   └── route.ts        # Services information
│   │   ├── testimonials/
│   │   │   └── route.ts        # Client testimonials
│   │   └── why-choose-ssc/
│   │       └── route.ts        # Company benefits and features
```

### Features
- **Serverless Functions:** Each API route is automatically converted to a serverless function
- **Built-in Middleware:** Support for request processing and authentication
- **Type Safety:** Full TypeScript support for API routes
- **Easy Integration:** Seamless integration with frontend components
- **Performance:** Automatic route optimization and caching
- **Security:** Built-in CORS and request validation

### API Endpoints
- `GET /api/nav-hero` - Fetch navigation menu and hero section content
- `GET /api/our-story` - Retrieve company history and story data
- `GET /api/regional-allocation` - Get global presence and regional distribution data
- `GET /api/services` - Fetch available services information
- `GET /api/testimonials` - Get client testimonials and reviews
- `GET /api/why-choose-ssc` - Retrieve company benefits and unique selling points

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens

