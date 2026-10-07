require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const journalRoutes = require("./routes/journalRoutes");
const commentRoutes = require("./routes/commentRoutes");

connectDB();

const PORT = process.env.PORT || 8888;

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});