import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/osuWrapped/", // Replace with your actual repo name!

  plugins: [tailwindcss()],

  server: {
    proxy: {
      "/oauth": {
        target: "https://osu.ppy.sh",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oauth/, "/oauth"),
      },
      "/api": {
        target: "https://osu.ppy.sh",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v2"),
      },
    },
  },
});
