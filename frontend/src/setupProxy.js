const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/books", "/book"],
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
}
