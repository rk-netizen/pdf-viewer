# PDF Viewer (React + TypeScript + Vite)

A mobile and tablet friendly app where a user uploads a PDF, sends it to a mock server for signing, and then views the signed PDF on their device. This app is fully mobile-responsive and provides a smooth experience on both phones and tablets. This app is built with React, TypeScript, and Vite.

## What’s Inside?

-   **React** for UI
-   **TypeScript** for type safety
-   **Vite** for fast development and builds
-   **Tailwind CSS** for styling and responsiveness
-   **MSW (Mock Service Worker)** to simulate backend API for PDF signing
-   **Vitest** (and Jest support) for testing

## How to Get Started

Clone the repo and install dependencies:

```sh
git clone <your-repo-url>
cd pdf-viewer
npm install
```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

To run all tests (using Vitest):

```sh
npx vitest
```

Or to run a specific test file:

```sh
npx vitest run src/components/PdfViewer.test.tsx
```

If you prefer Jest:

```sh
npx jest run src/mocks/handlers.test.ts
```

### Linting

Check code quality with ESLint:

```sh
npm run lint
```

## Configuration & Tools

-   **TypeScript:** See `tsconfig.json` and related files for strict type settings.
-   **Tailwind CSS:** Configured in `tailwind.config.cjs` and used throughout components for utility-first styling.
-   **MSW:** Mock API handlers are in `src/mocks/handlers.ts`.
-   **Testing:** Tests are in `src/components/*.test.tsx` and `src/mocks/handlers.test.ts`.
-   **Vite:** Main config in `vite.config.ts`.

## Features

-   Upload and preview PDF files instantly
-   Mobile and tablet responsive design
-   Sign PDF via mock backend (no real server needed)
-   Download signed PDF
-   Fully tested with Vitest/Jest
