const express = require('express'),
cors = require('cors');
const apiRoutes = require('./server/routes/api.routes');
const cookieSession = require("cookie-session");

//setup environment
require('dotenv').config();
//database
require('./server/config/db');

const app = express();
var corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "martyxmo", // should use as secret environment variable
    httpOnly: true
  })
);
app.use(express.json());
app.use('/api',apiRoutes);

//routing user login
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);


const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log('Server is running at http://localhost:3000')});

