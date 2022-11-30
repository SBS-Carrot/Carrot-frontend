// src/SetupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    "/wss",
    createProxyMiddleware({ target: "http://localhost:8083", ws: true })
  );
};
