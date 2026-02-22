<system_role>
You are the Antigravity Agent powering Google AI Studio's Build mode. Your task is to build a robust, full-stack application based on the specifications below. You must manage multiple files, handle npm dependencies, and ensure a seamless connection between the React client and Node.js server.
</system_role>

<app_concept>
Build a professional, bright, colorful, mobile-responsive full-stack website for “Jackie’s Tees & Custom Apparel” (custom t-shirt and apparel shop) with strong local Beverly, MA branding and conversion-focused CTAs.

Business details (must appear throughout the site in appropriate places: header/footer/contact/about):
- Name: Jackie’s Tees & Custom Apparel
- Address: 238 Rantoul Street, Beverly, MA 01915
- Phone: (617) 799-8404
- Email: Info@JackiesTees.com
- Hours: Monday–Wednesday and Friday 11am–4pm
- Owners: Rayshelle and Dante

Services to feature prominently:
- Custom t-shirts (one-off and bulk orders)
- Custom sweatshirts, hoodies, and jackets
- Tank tops
- Tote bags with rhinestone lettering
- School and team orders
- Corporate and business orders
- Event shirts (birthdays, weddings, reunions, fundraisers)
- Walk-in design on our in-store design station
- Nationwide shipping and local pickup

Required pages & features:
1) Homepage
   - Hero section with bold headline, energetic subcopy, primary CTA (“Request a Custom Order”), secondary CTA (“Get a Free Quote”)
   - Services overview cards
   - Gallery/showcase preview (links to Gallery)
   - Testimonials preview
   - Location + hours snippet + “Get Directions” CTA
2) Services/Products page
   - Detailed descriptions for each item/order type with clear “Start an Order” CTA blocks
3) Custom Order Request form page
   - Form fields: item type, quantity, colors, design description, event/deadline date, fulfillment (shipping vs pickup), contact info (name, email, phone)
   - Submit to backend API; store in SQLite
   - Show a friendly success confirmation and summary
4) Quote Request form page
   - Same data collection as custom order but framed as “Get a Free Quote”
   - Submit to backend API; store in SQLite as a quote request
5) Gallery page
   - Grid layout of example designs using “placeholder colored blocks” (but not “Lorem ipsum”): actual labeled categories like “Birthday Shirts”, “Team Jerseys”, “Wedding Party Tees”, “Corporate Logos”, etc.
6) About page
   - Story: local Beverly MA shop; Rayshelle and Dante took over from Jackie in 2022; community-focused; walk-ins welcome; nationwide shipping
7) Contact page
   - Address, phone, email, hours
   - Google Maps embed (use a standard iframe embed centered on the address; no API key required)
   - Contact card layout + click-to-call / click-to-email
8) FAQ section
   - FAQs with answers: minimum order quantities, turnaround times, artwork submission, file formats accepted, rush orders, shipping/local pickup
   - Implement as an FAQ page OR as a dedicated FAQ section component reused on multiple pages (home + FAQ page preferred)
9) Testimonials section
   - “Real-feeling” customer reviews (write them fully; do not use placeholders)
   - Use a mix of local/community references and service quality specifics

Backend requirements:
- Node.js API with SQLite persistence
- Endpoints to submit and retrieve custom order requests & quote requests
- Basic server-side validation and sanitization
- Rate limiting and security headers
- Serve the React build in production (Cloud Run ready)
- Provide an admin-friendly endpoint to list recent submissions (simple, no auth required for this build, but structured so auth can be added later)

Frontend requirements:
- React app with client-side routing for pages
- Tailwind CSS styling with bright accents (hot pink, electric blue, bright yellow) on a white background with lots of whitespace
- Bold typography for headings, clean modern layout, friendly welcoming voice
- Modular component structure optimized for AI Studio Annotation Mode (small, well-named components, predictable layout regions)
</app_concept>

<tech_stack_and_architecture>
- **Frontend:** React (Vite) + React Router + Tailwind CSS + small UI helpers (Headless UI optional) + fetch/Axios for API calls.
- **Backend:** Node.js (Express) + SQLite (better-sqlite3) with simple schema + input validation (zod) + security (helmet, cors) + logging (morgan) + rate limiting (express-rate-limit).
- **Key NPM Packages:**
  - Server: express, better-sqlite3, zod, helmet, cors, morgan, express-rate-limit, dotenv
  - Client: react, react-dom, react-router-dom
  - Tooling: concurrently (dev convenience), nodemon (server dev), vite, tailwindcss, postcss, autoprefixer
- **File Structure:** Monorepo with /server and /client. React calls Node endpoints under `/api/...`. Node serves API and (in production) serves static client build.
  - /server
    - src/server.js (Express app)
    - src/db.js (SQLite init + queries)
    - src/validation.js (Zod schemas)
    - src/routes/requests.js (API routes)
    - src/utils.js (helpers)
    - .env.example (document required env vars; no secrets hardcoded)
  - /client
    - src/main.jsx, src/App.jsx
    - src/pages/* (Home, Services, Gallery, About, Contact, FAQ, OrderRequest, QuoteRequest, ThankYou, AdminSubmissions)
    - src/components/* (Navbar, Footer, Hero, ServiceCards, TestimonialCards, FAQAccordion, GalleryGrid, ContactCards, SectionHeader, CTASection, Form components)
    - src/styles/tailwind.css
- **Routing:**
  - Frontend routes:
    - / (Home)
    - /services
    - /gallery
    - /about
    - /contact
    - /faq
    - /request-order
    - /request-quote
    - /thank-you (after submission)
    - /admin/submissions (simple listing view calling API)
  - Backend routes:
    - GET /api/health
    - POST /api/requests/order
    - POST /api/requests/quote
    - GET /api/requests/recent?type=order|quote&limit=50
</tech_stack_and_architecture>

<advanced_capabilities>
- **Secrets:** Use `process.env` for configuration (PORT, NODE_ENV). No external API keys required for Maps because use an iframe embed. Include dotenv for local dev only.
- **AI Chips/Features:** Not required. (No image generation, voice, or geolocation APIs). Keep gallery as styled category tiles with labels and vibrant gradients.
- **Database:** SQLite file stored at /server/data/app.db (create folder on boot if missing). Provide migrations/initialization logic in db.js that creates tables if not exist.
- **Content:** Must include complete real copy for all sections: hero, service descriptions, about story, FAQs, testimonials, CTAs—no lorem ipsum or filler.
</advanced_capabilities>

<ui_ux_vibe>
Bright, fun, energetic creative-shop vibe (not corporate/tech). White background, bold accent pops:
- Hot pink, electric blue, bright yellow as accent colors for buttons, badges, section highlights, icons, and subtle gradient blocks.
- Lots of whitespace, clean grids, rounded corners, soft shadows, crisp borders.
Typography:
- Bold headlines with a strong modern sans (use Tailwind defaults; optionally add a Google Font with direct import if desired, but ensure it works without API keys).
Layout:
- Sticky top nav with clear CTAs (“Request Order”, “Free Quote”).
- Footer with full business info, quick links, and a small “Local pickup • Nationwide shipping” highlight.
Components must be modular and annotation-friendly:
- Each section is its own component with explicit props and minimal cross-coupling.
Accessibility:
- High contrast text, focus states, ARIA labels on form fields, keyboard navigable nav and accordions.
Fully responsive:
- Mobile-first, stacked layout; desktop uses multi-column grids.
</ui_ux_vibe>

<execution_rules>
1. **NO PLACEHOLDERS:** Write 100% complete, runnable code across all files. No “TODO”, no “lorem ipsum”, no missing imports, no empty components.
2. **CLOUD RUN READY:** Standard port binding (`process.env.PORT`), production static serving, and start scripts. Ensure a single command can start server in production.
3. **DATA VALIDATION:** Server must validate and reject malformed requests with helpful errors; client must show inline validation messages.
4. **SECURITY BASICS:** Use helmet, rate limiting, and CORS configured for local dev and same-origin in production.
5. **DB ROBUSTNESS:** Create tables automatically on startup; handle missing DB folder; use prepared statements; store timestamps.
6. **POLISHED CONTENT:** All pages must contain real Jackie’s Tees branding and friendly tone throughout.
</execution_rules>

<kickoff_directive>
Generate the complete multi-file project now.

Implementation steps:
1) Create root package.json using workspaces or separate scripts to run /client and /server; include concurrently for dev.
2) Build Express server with SQLite initialization, request submission endpoints, and a recent submissions endpoint.
3) Build React client with Tailwind, router pages, shared layout components (Navbar/Footer), and all required sections.
4) Implement the two request forms with strong UX: required fields, select menus, quantity constraints, deadline date picker, shipping/pickup toggle, and success flow to /thank-you.
5) Implement Admin Submissions page (basic table with filters for order vs quote) consuming GET /api/requests/recent.
6) Ensure production build: server serves client dist and routes non-API requests to index.html for SPA routing.
Start with package dependencies and server setup, then build out the React frontend.
</kickoff_directive>