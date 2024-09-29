require("dotenv").config();
require("./app/db/conn");
const cors = require("cors");

const express = require("express");
const app = express();

const playersRoute = require("./app/routes/players");
const matchesRoute = require("./app/routes/matches");
const usersRoute = require("./app/routes/users");


app.use(cors({
    origin: "http://localhost:4200"  
}));
app.use(express.json());
app.use("/players", playersRoute);
app.use("/matches", matchesRoute);
app.use("/users", usersRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
