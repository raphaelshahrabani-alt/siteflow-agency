# Web Agency Sales Page - Project TODO

## Core Features

- [x] Initialize project with backend capabilities
- [x] Generate hero background and portfolio preview images
- [x] Build full agency sales landing page (Home.tsx)
- [x] Add navigation with smooth scroll
- [x] Hero section with headline and CTA
- [x] Portfolio/niche showcase section (auto, restaurant, salon, etc.)
- [x] Pricing/retainer plans section (3 tiers)
- [x] How it works / process section
- [x] Sales guide and objection handling section
- [x] Testimonials/social proof section
- [x] Contact / get started form
- [x] Footer with links and contact info
- [x] Integrate Stripe for monthly retainer payments
- [x] Create Stripe checkout session router
- [x] Build payment success and cancel pages
- [x] Add client onboarding flow after payment
- [x] Write vitest tests for payment router (13 tests passing)
- [x] TypeScript check passes with zero errors
- [x] Save final checkpoint

### Phase 2: Backend Infrastructure
- [x] Upgrade project to web-db-user template with backend capabilities
- [x] Set up Express server with tRPC integration
- [x] Configure MySQL database connection
- [x] Implement OAuth authentication system
- [x] Set up environment variables and secrets management

### Phase 3: Service Pricing Table
- [x] Create pricing section with service table
- [x] Add six services with descriptions and prices
- [x] Implement hover effects for better UX
- [x] Make pricing table responsive for mobile devices
- [x] Add disclaimer about price variations

### Phase 4: Gallery Page
- [x] Create before/after gallery section
- [x] Add four gallery items with AI-generated before/after photos
- [x] Include descriptions for each gallery item
- [x] Implement responsive grid layout
- [x] Add hover effects and shadows for visual interest
- [x] Generate professional automotive service images (Engine Restoration, Transmission Repair, Suspension Work, Electrical System)

### Phase 5: Email Notification System
- [x] Create quotes router with tRPC procedures
- [x] Implement quote request form with validation
- [x] Integrate with owner notification system
- [x] Add form state management with React hooks
- [x] Implement success/error toast notifications
- [x] Create comprehensive vitest tests for quotes router
- [x] Test validation for email, phone, and required fields
- [x] Verify notification delivery to business owner

## Testing & Quality Assurance
- [x] Run TypeScript type checking (no errors)
- [x] Execute vitest test suite (6 tests passing)
- [x] Verify form submission and validation
- [x] Test responsive design on mobile/tablet/desktop
- [x] Validate all links and navigation
- [x] Check image loading and optimization
- [x] Verify AI-generated gallery images load correctly

## Deployment & Documentation
- [x] Create initial checkpoint with base website
- [x] Upgrade to backend capabilities
- [x] Create final checkpoint with all features
- [x] Document all implemented features
- [x] Prepare for production deployment

## Future Enhancement Ideas
- [ ] Add admin dashboard for managing services and pricing
- [ ] Implement customer appointment booking system
- [ ] Add real before/after photo gallery with upload functionality
- [ ] Create service review management system
- [ ] Add Google Maps integration for location
- [ ] Implement SMS notifications for quote requests
- [ ] Create customer portal for service history
- [ ] Add live chat support widget
- [ ] Implement SEO optimization
- [ ] Add blog section for automotive tips

## Notes
- All features use the Industrial Minimalism design system with warm orange (#ff6b35) accents
- Georgia serif font used for headings, system sans-serif for body text
- Email notifications sent to business owner via built-in notification system
- All form validation handled with Zod schema validation
- Responsive design tested across all major breakpoints
- TypeScript strict mode enabled for type safety

## Pricing Update
- [x] Change to single plan: $500 one-time setup + $50/month retainer
- [x] Update PLANS array in Home.tsx
- [x] Update products.ts Stripe config
- [x] Update agency router planId validation
- [x] Update sales script section to reflect new pricing
- [x] Verify TypeScript still passes (12 tests passing)

## Vercel Deployment
- [x] Add vercel.json routing config
- [x] Create api/index.ts serverless entry point
- [x] Update package.json build script for Vercel
- [x] Ensure DB works with PlanetScale (serverless-compatible MySQL)
- [x] TypeScript check passes (zero errors)
- [x] Package and deliver with deployment guide
