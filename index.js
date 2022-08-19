const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;
const teamRoutes = require("./routes/teamsRouter");

app.use("/api/v1", teamRoutes);

const start = async () => {
  try {
    await connectDB(process.env.db_url);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
