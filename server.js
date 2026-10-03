require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});