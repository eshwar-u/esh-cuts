import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/test": "https://iwxclylnoe.execute-api.us-east-2.amazonaws.com",
    },
  },
});
