require("dotenv").config();
const express = require("express");
const initialSetup = require('./src/config/initialSetup')
const routes = require("./src/routes");
const morgan = require("morgan");
const sequelize = require("./src/config/database");



// sequelize.sync()
sequelize
    .sync({
        force: true,
    })
    .then(() => {
        console.log("Connection with database has been established sucessfully");
        initialSetup()
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/", routes);

require('./src/models/index')
// app.use("/", (req, res) => {
//     res.send("hello world");
// });


const server = app.listen(process.env.APP_PORT, () => {
    const port = server.address().port;
    console.log("Example app listening at http://localhost:%s", port);
});



module.exports = app;
