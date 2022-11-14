const playerRoute = require("./player.js");
const adminRoute = require("./admin.js");
const eventRoute = require("./event.js");
const authRoute = require("./auth.js");
const meRoute = require("./me.js");
const cardRoute = require("./card.js");

const homeRoute = require("./home.js");


const cors = require("cors");
function route(app) {
    app.use(cors());
    app.use("/card-generator", cardRoute);
    app.use("/me", meRoute);
    app.use("/events", eventRoute);
    app.use("/admin", adminRoute);
    app.use("/players", playerRoute);

    app.use("/auth", authRoute);
    // app.use("/home", homeRoute);
    app.use("/", homeRoute);


}

module.exports = route;
