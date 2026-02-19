import { defineConfig } from "vite";

export default defineConfig({
  base: "/osuWrapped/", // Replace with your actual repo name!

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
