const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/books",
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
}
