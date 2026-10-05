require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();

const PORT = process.env.PORT || 8888;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});