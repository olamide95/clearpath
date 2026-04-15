# ClearPathScholar - Setup & Deployment Instructions

## Project Overview

ClearPathScholar is a premium, production-quality scholarship lead-generation website built with Next.js, React, Tailwind CSS, and Firebase Firestore. The platform features a beautiful landing page, scholarship application form, and admin dashboard for managing submissions.

## Tech Stack

- **Frontend:** React 19, Tailwind CSS 4, Wouter (routing)
- **Backend/Database:** Firebase Firestore
- **Styling:** Institutional Elegance design system (deep navy, warm gold)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Manus (built-in hosting)

## Project Structure

```
clearpath-scholar/
├── client/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── EligibilitySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── ApplicationForm.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── NotFound.tsx
│   │   ├── lib/
│   │   │   ├── firebase.ts
│   │   │   └── nigerian-states.ts
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   └── index.ts
├── package.json
└── README.md
```

## Firebase Configuration

The Firebase configuration is embedded in `client/src/lib/firebase.ts`. The current setup uses:

- **Project ID:** clearpath-f099c
- **Database:** Firestore
- **Collection:** applications

### Firebase Setup

1. The Firebase SDK is already installed via `pnpm add firebase`
2. Configuration is in `client/src/lib/firebase.ts`
3. Firestore collection structure:
   - Collection: `applications`
   - Fields: fullName, phoneNumber, emailAddress, currentSchool, yearsToGraduation, age, gradeClass, stateOfOrigin, lga, createdAt

## Local Development

### Prerequisites

- Node.js 18+ (already installed)
- pnpm (already installed)

### Installation

```bash
cd clearpath-scholar
pnpm install
```

### Running Locally

```bash
pnpm dev
```

The dev server will start at `http://localhost:3000`

### Building for Production

```bash
pnpm build
```

This creates optimized production builds in the `dist/` directory.

## Environment Variables

The project uses the following environment variables (automatically injected by Manus):

- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID
- `VITE_APP_ID` - Application ID
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Application logo URL

Firebase credentials are hardcoded in `client/src/lib/firebase.ts` (safe for public web apps).

## Pages & Routes

### 1. Home Page (`/`)
- Landing page with hero section
- Scholarship benefits showcase
- Program options
- How it works process
- Eligibility requirements
- Contact information
- Footer with links

### 2. Application Form (`/apply`)
- Comprehensive scholarship application form
- Form validation with error messages
- Firestore integration for submissions
- Success/error feedback
- Fields: Full Name, Email, Phone, School, Years to Graduation, Age, Grade/Class, State, LGA
- Text inputs for State and LGA (no dropdowns)

### 3. Admin Dashboard (`/admin`)
- View all submissions in a table
- Search functionality (by name, email, phone, state)
- Statistics cards (total, filtered, last updated)
- Delete submissions with confirmation
- CSV export functionality
- No authentication required

## Design System

### Color Palette (Institutional Elegance)

- **Primary:** Deep Navy (#1a3a52)
- **Accent:** Warm Gold (#d4a574)
- **Secondary:** Medium Navy (#2c5aa0)
- **Background:** White
- **Text:** Charcoal (#3a3a3a)

### Typography

- **Headlines:** Playfair Display (serif) - 700 weight
- **Subheadings:** Lora (serif) - 600 weight
- **Body:** Source Sans Pro (sans-serif) - 400 weight

### Components

All components use shadcn/ui base components with custom Institutional Elegance styling. Key component classes:

- `.btn-primary` - Primary call-to-action button
- `.btn-secondary` - Secondary button with border
- `.card-embossed` - Embossed card with subtle shadow
- `.section-spacing` - Standard section padding
- `.divider-gold` - Gold accent divider line

## Customization Guide

### Changing Contact Information

Edit `client/src/components/Footer.tsx` and `client/src/components/ContactSection.tsx`:

```tsx
// Update email
<a href="mailto:your-email@example.com">your-email@example.com</a>

// Update phone
<a href="tel:+yourphonenumber">+Your Phone Number</a>

// Update address
<p>Your Address, City, Country</p>
```

### Changing Scholarship Benefits

Edit `client/src/components/BenefitsSection.tsx`:

```tsx
const benefits = [
  {
    icon: GraduationCap,
    title: "Your Benefit Title",
    description: "Your benefit description"
  },
  // ... more benefits
];
```

### Changing Programs

Edit `client/src/components/ProgramsSection.tsx`:

```tsx
const programs = [
  {
    title: "Program Name",
    description: "Program description",
    level: "Level"
  },
  // ... more programs
];
```

### Updating Hero Section

Edit `client/src/components/HeroSection.tsx`:

```tsx
<h1 className="text-white mb-6 leading-tight">
  Your new headline here
</h1>
```

## Deployment

### Deploying to Manus

1. **Create a Checkpoint:**
   - All changes are automatically saved
   - Create checkpoints before major updates

2. **Publish:**
   - Click the "Publish" button in the Manus UI
   - Your site will be deployed to a Manus domain
   - Custom domains can be configured in settings

3. **Custom Domain:**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Deploying to Other Platforms

If you choose to deploy elsewhere (not recommended - Manus provides built-in hosting):

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Maintenance

### Viewing Submissions

1. Navigate to `/admin`
2. View all applications in the table
3. Search by name, email, phone, or state
4. Export to CSV for external processing
5. Delete submissions as needed

### Backing Up Data

Firestore automatically backs up all data. To export submissions:

1. Go to Admin Dashboard
2. Click "Export CSV"
3. Save the file locally

### Updating Content

All content is easily editable in the component files. No database migrations needed for text changes.

## Troubleshooting

### Form Submissions Not Saving

1. Check Firebase credentials in `client/src/lib/firebase.ts`
2. Verify Firestore is enabled in Firebase Console
3. Check browser console for errors (F12 → Console tab)
4. Ensure network requests are successful (F12 → Network tab)

### Admin Dashboard Not Loading

1. Check Firebase credentials
2. Ensure Firestore collection exists (`applications`)
3. Clear browser cache and reload
4. Check browser console for errors

### Styling Issues

1. Ensure Tailwind CSS is properly compiled
2. Check that `client/src/index.css` is imported in `main.tsx`
3. Verify Google Fonts are loading (check Network tab)

## Support & Maintenance

- **Design Updates:** Edit component files in `client/src/components/`
- **Form Fields:** Update `client/src/pages/ApplicationForm.tsx`
- **Database Schema:** Update `client/src/lib/firebase.ts`
- **Styling:** Update `client/src/index.css` for global changes

## Security Notes

- No authentication required (as per requirements)
- Admin dashboard is publicly accessible
- Firebase security rules should be configured in Firebase Console
- Consider adding rate limiting for form submissions in production

## Performance Optimization

- Images are optimized and served via CDN
- Tailwind CSS is tree-shaken for minimal bundle size
- Vite provides fast development and optimized production builds
- Firebase SDK is modular and only imports needed features

## Future Enhancements

Potential features to add:

1. Email notifications on new submissions
2. Application status tracking for applicants
3. Admin authentication
4. Advanced analytics and reporting
5. Multi-language support
6. Payment integration for application fees
7. Document upload for applications
8. Automated email confirmations

## License

This project is proprietary and confidential.

## Contact

For support or questions, contact: info@clearpathscholar.com
