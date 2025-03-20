import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*", // Разрешаем CORS для всех API маршрутов
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }
        ],
      },
    ];
  },
  // Отключение ESLint во время сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;