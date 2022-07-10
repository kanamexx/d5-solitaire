module.exports = {
  launch: {
    headless: true,
    args: ["--no-sandbox"],
  },
  server: {
    command: "npm run dev",
    port: 3006,
    launchTimeout: 50000,
    debug: true,
  },
};
