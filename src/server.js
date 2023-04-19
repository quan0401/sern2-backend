import express from "express";

import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import testConnection from "./config/connectDB";
import initApiRoutes from "./routes/apis";
var cors = require("cors");

require("dotenv").config();

const app = express();
// cors
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

// Initialize api routes
initApiRoutes(app);

// testConnection();

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(">>> Sern2 is running on ", PORT);
});
