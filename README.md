# LeadQ.AI Landing-Page

A modern, interactive landing page for LeadQ.AI - The AI Copilot That Automates Lead Management.

## Overview

LeadQ.AI is an AI-powered platform that transforms how businesses manage leads and convert them into revenue. This landing page showcases the platform's capabilities with stunning animations, interactive demonstrations, and comprehensive feature explanations

## Tech-Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 12.34.0
- **3D Graphics**: Three.js 0.182.0
- **UI Components**: Radix UI
- **Routing**: React Router DOM 7.13.0
- **Backend**: Supabase 2.57.4
- **Additional Libraries**:
  - Lottie animations
  - React Markdown
  - Lucide React (icons)

## Features

### Landing-Page Sections

1. **Hero Section** - Animated headline with gradient text effects
2. **What LeadQ.AI Does** - Platform overview and value proposition
3. **Features** - Key platform capabilities showcase
4. **Lead Capture Stream** - Real-time lead visualization
5. **Profile Enrichment** - AI-powered lead research demonstration
6. **Dashboard Preview** - Interactive dashboard mockup
7. **Bookings & Meetings** - Calendar integration showcase
8. **Email Draft Animation** - AI email generation demo
9. **Outbound Voice Agent** - Voice AI capabilities
10. **AI Agents** - Autonomous agent showcase
11. **Use Cases** - Industry-specific applications
12. **Pricing** - Pricing plans and comparison
13. **Testimonials** - Customer success stories
14. **FAQ** - Frequently asked questions
15. **Contact** - Contact form and information
16. **Final CTA** - Call-to-action with energy beam effects

### UI/UX Features

- **Animated Shader Background** - Dynamic WebGL background effects
- **Scroll Progress Indicator** - Visual scroll tracking
- **Scroll to Top Button** - Quick navigation
- **Skip to Content** - Accessibility feature
- **Cookie Consent** - GDPR-compliant cookie management
- **Responsive Navigation** - Mobile-friendly navbar with smooth transitions
- **Glass Morphism Effects** - Modern UI aesthetics
- **Noise Texture Overlay** - Subtle visual depth

## Project Structure

```
landingpage/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, and media
│   │   └── fonts/       # Custom font files
│   ├── components/      # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── ...          # Other feature components
│   ├── data/            # Static data and content
│   ├── lib/             # Utility functions and helpers
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── testsprite_tests/    # Automated test suite
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landingpage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Color Palette

The brand uses a sophisticated color scheme:

- **Background**: `#05060e` (Deep night blue)
- **Primary**: `#2751a9` (Royal blue)
- **Accent**: `#4fa4c4` (Cyan)
- **Highlight**: `#bfa9c9` (Purple)
- **Text**: 
  - Platinum: `#E5E7EB` (Headings)
  - Silver: `#C0C0C0` (Body text)
  - Steel: `#6B7280` (Secondary text)

## Testing

The project includes a comprehensive test suite powered by TestSprite covering:

- Header navigation and responsiveness
- Navigation hover effects and dropdowns
- Mobile menu functionality
- Hero section animations
- Feature showcases
- Form validation
- Scroll behavior
- Accessibility features
- Performance benchmarks

Run tests from the `testsprite_tests/` directory.

## Build & Deployment

Build the project for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with Vite
- Lazy loading of components
- Optimized animations with Framer Motion
- Image optimization
- CSS purging with Tailwind
- Production build minification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

All rights reserved.

## Contact

For questions or support, please visit the Contact section on the landing page.
