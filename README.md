# StyloBliss SaaS Landing Page

A modern, responsive SaaS landing page for salon and spa management software, built with React, TypeScript, and Vite.

Check out the live demo: [https://stylobliss-saas-landing-page.vercel.app](https://stylobliss-saas-landing-page.vercel.app)

## Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for lightning-fast performance.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
- **SPA Routing**: Implements `react-router-dom` for smooth client-side navigation without page reloads.
- **Production Ready**: Optimized build process and configured for deployment on Vercel.
- **Interactive UI**: Features animations using `framer-motion` and interactive components like mega-menus and testimonial sliders.

## Project Structure

```
src/
├── assets/         # Local static assets (images, icons)
├── components/     # Reusable React components
│   ├── navbar-mega-menu.tsx
│   ├── login-page.tsx
│   └── ...
├── imports/        # Shared UI sub-components and SVG paths
├── styles/         # Global styles and Tailwind configuration
├── App.tsx         # Main application component with routing
└── main.tsx        # Entry point
```

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Start Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3.  **Build for Production**

    ```bash
    npm run build
    ```

    The build artifacts will be stored in the `build/` directory.

## Deployment

This project is configured for deployment on Vercel.

1.  Push your changes to GitHub.
2.  Import the project into Vercel.
3.  The `vercel.json` configuration file handles the rewriting logic for SPA routing, ensuring that refreshing pages works correctly in production.

## Credits

Original design by [Figma](https://www.figma.com/design/PbkWuHacWh0bN7Y1sVeayg/stylobliss-saas-landing-page).