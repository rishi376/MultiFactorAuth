const express = require('express');
const cors = require('cors');
const authRoutes = require('./router/authRoute');
const { default: mongoose } = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: "../backend/config/.env" });
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
    family: 4,
})
.then(() =>console.log("Mongo DB connected!"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('CORS-enabled web server listening on port 80')
});