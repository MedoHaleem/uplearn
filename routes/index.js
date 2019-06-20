import JSend from '../services/Jsend'
/**
 * The default index route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = app => {
  app.get("/", (req, res) => {
    JSend.success(res, "UpLearn  Code Challenge Started")
  });
};
