const controller = require("../controllers//post.controller");
const  authJwt  = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/post/all", controller.get);
    app.post("/api/post/create",[authJwt.verifyToken],controller.post); 
    app.put("/api/post/update",[authJwt.verifyToken],controller.put);
    app.post("/api/post/delete",[authJwt.verifyToken],controller.delete);
    app.get("/api/post/search",controller.getPost);
    app.post("/api/post/single",controller.getSinglePost);
  };