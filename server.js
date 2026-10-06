require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

connectDB();

const PORT = process.env.PORT || 8888;

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/collections", collectionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});