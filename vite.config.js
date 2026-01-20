import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';
import path from 'path';
// Load environment variables from .env file
config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  },
  esbuild: {
    loader: "tsx", // OR "jsx"
    include: [
      // Add this for business-as-usual behaviour for .jsx and .tsx files
      "src/**/*.jsx",
      "src/**/*.tsx",
      // Add this to allow JSX syntax in JS files
      "src/**/*.js",
    ],
  },
  // optimizeDeps: {
  //   exclude: ['react-helmet']
  // }
})
