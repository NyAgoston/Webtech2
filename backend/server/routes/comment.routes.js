const controller = require("../controllers/comment.controller");
const  authJwt  = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("/api/comment/get", controller.getComments);
    app.get("/api/comment/all", controller.getAll);
    app.post("/api/comment/create",[authJwt.verifyToken],controller.createComment);         
  };