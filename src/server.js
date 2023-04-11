import express from "express";

import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import testConnection from "./config/connectDB";

require("dotenv").config();

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

// testConnection();

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(">>> Sern2 is running on ", PORT);
});
