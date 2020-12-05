const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport.js");

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log("Server started on port 5000.")
});