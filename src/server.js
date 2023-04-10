import express from "express";

import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

require("dotenv").config();

const app = express();

// Config view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(">>> Sern2 is running on ", PORT);
});
