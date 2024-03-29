const jwt = require("jsonwebtoken");
const httpStatusCode = require('http-status-codes');
var bcrypt = require("bcryptjs");
const User = require('../models/user.model');
const config = require('../config/auth.config');

//create new user
exports.signup = (req,res) =>{
    const obj = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
    User.create(obj).then(doc=>{
        res.status(httpStatusCode.CREATED).send(doc);
        
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};
//sign user out
exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      this.next(err);
    }
};
//bejelentkezés
exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).send({ message: "No such user" });
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }  
      const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });  
      req.session.token = token;  
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };





