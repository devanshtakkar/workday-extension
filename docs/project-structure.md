# Project Structure and Build Process

This document outlines the structure of the Chrome extension project, focusing on the `src` and `dist` directories, and how files are processed and organized.

## Directory Structure

### `src` Directory (Source Code)

The `src` directory contains all the original, uncompiled source code for the extension. It is organized into subdirectories based on functionality:

-   `src/background/`: Contains the TypeScript code for the extension's background service worker (e.g., `index.ts`).
-   `src/sidebar/`: Contains the TypeScript and React (TSX) code for the extension's sidebar panel (e.g., `index.tsx` for the React application and `sidebar.html` as its HTML entry point).
-   Other directories for content scripts, assets, etc., would also reside here.

### `dist` Directory (Distribution / Build Output)

The `dist` directory contains the processed and compiled files that are ready to be loaded as a Chrome extension. The structure of the `dist` directory is as follows:

-   `dist/manifest.json`: The extension's manifest file, located at the root of the `dist` directory. This file describes the extension to Chrome.
-   `dist/sidebar.html`: The HTML file for the sidebar, located at the root of the `dist` directory. This file serves as the entry point for the sidebar's React frontend.
-   `dist/background/index.js`: The compiled JavaScript for the background service worker. The folder structure (`background/`) mirrors the `src` directory.
-   `dist/sidebar/index.js`: The compiled JavaScript bundle for the sidebar's React application. The folder structure (`sidebar/`) mirrors the `src` directory.

## Build Process (`build.mjs`)

The `build.mjs` script is responsible for transforming the source code from the `src` directory into the final, usable browser-compatible JavaScript files in the `dist` directory. This script utilizes `esbuild` for fast and efficient bundling and compilation.

Key functions of the build process:

1.  **TypeScript to JavaScript Conversion**: It compiles TypeScript files (`.ts` and `.tsx`) from the `src` directory into JavaScript files (`.js`).
2.  **JSX Transformation**: For React components (typically in `.tsx` files), it handles the JSX transformation, converting it into standard JavaScript that browsers can understand (via `React.createElement` calls).
3.  **Bundling**: It bundles the necessary code and its dependencies into single output files for each entry point (e.g., background script, sidebar script).
4.  **Output Organization**: It places the compiled files into the `dist` directory, maintaining a similar subfolder structure to `src` for the JavaScript bundles (e.g., `dist/background/`, `dist/sidebar/`).

## Frontend Technology

-   **Sidebar**: The extension's sidebar panel uses **React** for its frontend user interface. The React components are written in TypeScript (TSX files).

This setup allows for a modern development workflow using TypeScript and React, with an efficient build step provided by esbuild to prepare the extension for use in the browser. 