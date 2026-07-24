# Krishna Garg — Full-Stack 3D Dynamic Portfolio + Custom Admin CMS

A production-quality personal developer portfolio website and custom admin CMS for **Krishna Garg** (Full Stack Developer & Data Analyst, B.Tech CSE student at GGSIPU MSIT with CGPA 9.4 / 10).

The public website features a sophisticated, dark editorial developer identity inspired by the maturity and restraint of `piyushgarg.dev`, combined with an abstract architectural Three.js 3D hero environment, case-study project presentations, and dynamic section visibilities.

The custom Next.js admin dashboard provides complete CRUD management over all text copy, projects, experience, skills, education, achievements, hackathons, certifications, social links, navigation items, media assets, resume PDF, and contact inquiries stored in MongoDB Atlas.

---

## Technical Highlights & Features

1. **Full-Stack Architecture**: Built on Next.js App Router with React Server Components, TypeScript, and MongoDB Atlas via Mongoose.
2. **Abstract 3D Hero Environment**: Built with Three.js, React Three Fiber (`@react-three/fiber`), and Drei (`@react-three/drei`). Includes mouse parallax tracking, DPR optimization, and an automatic static/CSS fallback for non-WebGL devices or `prefers-reduced-motion`.
3. **Full Content Copy CMS**: Almost all public website text (hero headline, name, title, description, about copy, section headings, CTA labels, logo text, footer) is editable live from the admin dashboard without touching code.
4. **Complete Admin CMS Modules**:
   - **Dashboard**: Real MongoDB analytics counters & recent message activity.
   - **Site Content**: Live form editor for all public website text copy.
   - **Projects**: Markdown case-study editor, slug generator, cover image uploader, featured/draft toggles, and ordering.
   - **Experience**: Timeline CRUD for internships, leadership roles, and mentorship.
   - **Skills**: Categorized technology tags (Frontend, Languages, Data Analysis, Tools) without fake percentage bars.
   - **Education**: Homepage visible degree cards, CGPA, and coursework pills.
   - **Achievements**: Awards, hackathon placements, and honors.
   - **Hackathons**: Competition results, team roles, and project titles.
   - **Certifications**: Credential URLs, licenses, and media attachments.
   - **Social Links**: Dynamic social channel manager (GitHub, LinkedIn, Email, WhatsApp, etc.).
   - **Navigation**: Header menu links, section anchors, and display ordering.
   - **Media**: Cloudinary asset library browser & upload dropzone.
   - **Resume**: Upload, replace, view, or remove resume PDF; edit public resume CTA button label.
   - **Messages**: Contact form inbox with read/unread tracking and deletion.
   - **Settings**: Section visibility toggles (About, Projects, Experience, Skills, Achievements, Hackathons, Education, Contact, WhatsApp), WhatsApp contact configuration, and SEO metadata.
5. **Security & Authentication**:
   - Protected `/admin/*` routes via Next.js Middleware checking signed HTTP-only JWT cookies.
   - Independent server-side authorization on every Server Action and API route mutation.
   - Password hashing with `bcryptjs`.
6. **Media Management**: Cloudinary integration for profile photos, project covers, screenshots, and resume PDF with automated asset cleanup.
7. **SEO & Accessibility**: Dynamic sitemap (`sitemap.ts`) excluding draft projects, `robots.ts`, dynamic OpenGraph metadata, semantic HTML5, and responsive layout across Mobile, Tablet, and Desktop.

---

## Tech Stack

* **Core Framework**: Next.js 15 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS, CSS Modules
* **3D WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animations**: `framer-motion`, `gsap`
* **Database**: MongoDB Atlas with `mongoose`
* **Authentication**: JWT, `bcryptjs`, HTTP-only cookies
* **Media Storage**: Cloudinary SDK
* **Validation & Markdown**: `zod`, `react-markdown`, `rehype-sanitize`

---

## Local Setup & Environment Configuration

### 1. Prerequisites
- Node.js 18+ and `npm` installed.
- MongoDB Atlas cluster URI (or local MongoDB database).
- Cloudinary Account credentials (optional for image upload testing).

### 2. Environment Variables Setup
Create a `.env.local` file in the root directory (refer to `.env.example`):

```bash
# MongoDB Atlas Connection URI (REQUIRED)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishna_portfolio?retryWrites=true&w=majority

# Admin Credentials & Auth Secrets
ADMIN_USERNAME=admin
ADMIN_PASSWORD=krishna_admin_2026
JWT_SECRET=super-secret-krishna-portfolio-jwt-key

# Cloudinary Media Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Running Development Server
Install dependencies and run Next.js dev server:

```bash
npm run dev
```

Open `http://localhost:3000` to view the public portfolio website.
Open `http://localhost:3000/admin` to access the Custom Admin CMS.

Default admin credentials bootstrapped automatically:
- **Username**: `admin` (or configured `ADMIN_USERNAME`)
- **Password**: `krishna_admin_2026` (or configured `ADMIN_PASSWORD`)

---

## Production Build Verification

To verify production build and type safety:

```bash
# Type check
npx tsc --noEmit

# Production Build
npm run build

# Start Production Server
npm start
```

---

## License

Created by **Krishna Garg** · 2026. All rights reserved.
