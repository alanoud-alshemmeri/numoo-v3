import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const standalone = process.env.BUILD_STANDALONE === "1";

const rawPort = process.env.PORT;
if (!standalone && !rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}
const port = standalone ? 0 : Number(rawPort);
if (!standalone && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;
if (!standalone && !basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const standalonePlugins = standalone
  ? [
      await import("vite-plugin-singlefile").then((m) =>
        m.viteSingleFile({ removeViteModuleLoader: true }),
      ),
    ]
  : [];

export default defineConfig({
  base: standalone ? "./" : basePath,
  define: {
    __NUMOO_STANDALONE__: JSON.stringify(standalone),
  },
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined &&
    !standalone
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
    ...standalonePlugins,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: standalone
    ? {
        outDir: path.resolve(import.meta.dirname, "dist/standalone"),
        emptyOutDir: true,
        assetsInlineLimit: 100_000_000,
        cssCodeSplit: false,
        rollupOptions: {
          output: { inlineDynamicImports: true },
        },
      }
    : {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true,
      },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
