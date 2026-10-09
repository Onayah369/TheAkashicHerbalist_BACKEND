const express = require("express");
const cors = require("cors");
const herbRoutes = require("./routes/herbRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    })
);
app.use(express.json());

app.use("/api/herbs", herbRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to The Akashic Herbalist API");
});

module.exports = app;