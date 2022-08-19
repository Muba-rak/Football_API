require("dotenv").config();
const connectDB = require("./db/connect");
const Teams = require("./models/teams");

const jsonTeam = require("./team.json");

const start = async () => {
  try {
    await connectDB(process.env.db_url);
    await Teams.deleteMany();
    await Teams.create(jsonTeam);
    process.exit(0); //exit the process
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
