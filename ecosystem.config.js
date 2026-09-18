module.exports = {
  apps: [
    {
      name: "devshelf-view",
      cwd: "./apps/view",
      script: "npm",
      args: "start -- --port 5002",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "devshelf-dashboard",
      cwd: "./apps/dashboard",
      script: "npm",
      args: "start -- --port 5000",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "devshlef-api",
      cwd: "./apps/api",
      script: "npm",
      args: "start -- --port 5001",
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
    },
    // {
    //   name: "devshelf-bot",
    //   cwd: "./apps/bot",
    //   script: "npm",
    //   args: "start",
    //   instances: 1,
    //   autorestart: true,
    //   watch: false,
    //   env: {
    //     NODE_ENV: "production",
    //   },
    // },
  ],
};