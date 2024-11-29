// vite.config.ts
import { defineConfig } from "file:///Users/K2/Documents/K2/uMe-Client/node_modules/vite/dist/node/index.js";
import dotenv from "file:///Users/K2/Documents/K2/uMe-Client/node_modules/dotenv/lib/main.js";
import reactRefresh from "file:///Users/K2/Documents/K2/uMe-Client/node_modules/@vitejs/plugin-react-refresh/index.js";
import tsconfigPaths from "file:///Users/K2/Documents/K2/uMe-Client/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const envFiles = {
    development: ".env.development",
    staging: ".env.staging",
    uat: ".env.uat",
    production: ".env.production"
  };
  const envFile = envFiles[mode] || ".env.development";
  const envConfig = dotenv.config({ path: envFile }).parsed;
  return {
    plugins: [reactRefresh(), tsconfigPaths()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          }
        }
      }
    },
    server: {
      port: 3335
    },
    ...envConfig
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvSzIvRG9jdW1lbnRzL0syL3VNZS1DbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9LMi9Eb2N1bWVudHMvSzIvdU1lLUNsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvSzIvRG9jdW1lbnRzL0syL3VNZS1DbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnZGaWxlcyA9IHtcbiAgICBkZXZlbG9wbWVudDogXCIuZW52LmRldmVsb3BtZW50XCIsXG4gICAgc3RhZ2luZzogXCIuZW52LnN0YWdpbmdcIixcbiAgICB1YXQ6IFwiLmVudi51YXRcIixcbiAgICBwcm9kdWN0aW9uOiBcIi5lbnYucHJvZHVjdGlvblwiLFxuICB9O1xuXG4gIGNvbnN0IGVudkZpbGUgPSBlbnZGaWxlc1ttb2RlXSB8fCBcIi5lbnYuZGV2ZWxvcG1lbnRcIjtcbiAgY29uc3QgZW52Q29uZmlnID0gZG90ZW52LmNvbmZpZyh7IHBhdGg6IGVudkZpbGUgfSkucGFyc2VkO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdFJlZnJlc2goKSwgdHNjb25maWdQYXRocygpXSxcbiAgICBidWlsZDoge1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWQuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdLnNwbGl0KFwiL1wiKVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogMzMzNSxcbiAgICB9LFxuICAgIC4uLmVudkNvbmZpZyxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLG9CQUFvQjtBQUNsVCxPQUFPLFlBQVk7QUFDbkIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxtQkFBbUI7QUFHMUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxXQUFXO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxZQUFZO0FBQUEsRUFDZDtBQUVBLFFBQU0sVUFBVSxTQUFTLElBQUksS0FBSztBQUNsQyxRQUFNLFlBQVksT0FBTyxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUMsRUFBRTtBQUNuRCxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQztBQUFBLElBQ3pDLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IscUJBQU8sR0FBRyxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLFlBQ2xEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLEdBQUc7QUFBQSxFQUNMO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
