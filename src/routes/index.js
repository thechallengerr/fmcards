const AuthRoute = require("./auth.js");

const cors = require("cors");
function route(app) {
    app.use(cors());
    app.use("/auth", AuthRoute);
    app.get("/", (req, res) => {
        res.render("home");
    });


}

module.exports = route;
