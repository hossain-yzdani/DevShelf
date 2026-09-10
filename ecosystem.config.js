module.exports = {
  apps: [
    {
      name: "devshelf-dashboard", // اسم دلخواه برای اپ Next.js
      cwd: "./apps/dashboard", // مسیر پوشه اپ
      script: "npm", // استفاده از npm برای اجرا
      args: "start -- --port 5000", // دستور start با پورت مشخص
      env: {
        NODE_ENV: "production",
        PORT: 5000, // پورت رو هم اینجا تعیین کن
      },
    },
    {
      name: "devshlef-api", // اسم دلخواه برای اپ NestJS
      cwd: "./apps/api", // مسیر پوشه اپ
      script: "npm",
      args: "start -- --port 5001", // پورت API
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
    },
    {
      name: "devshelf-bot",
      cwd: "./apps/bot",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    }
  ],
};