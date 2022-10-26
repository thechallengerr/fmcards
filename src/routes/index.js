const cardRoute = require("./card.js");
const adminRoute = require("./admin.js");
const eventRoute = require("./event.js");
const homeRoute = require("./home.js");


const cors = require("cors");
function route(app) {
    app.use(cors());
    app.use("/events", eventRoute);
    app.use("/admin", adminRoute);
    app.use("/cards", cardRoute);

    app.use("/auth", cardRoute);
    app.use("/home", homeRoute);


}

module.exports = route;
