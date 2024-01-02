const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const dotenv = require("dotenv");
const fileRoute = require("./routes/files");
const ShowRoute = require("./routes/show");
const path = require("path");
const downloadRoute = require("./routes/download");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(express.static('public'));
app.use(cors);

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

mongoose.connect(process.env.MONGO_CONNECTION_URL).then ( () => {
    console.log("MongoDB Connected");
}
).catch((err) => {
    console.log(err);
})

app.set('views',path.join(__dirname,'/views'));
app.set('view-engine','ejs');

app.use("/api/files", fileRoute);
app.use("/files",ShowRoute);
app.use('/files/download',downloadRoute);

app.listen(8080, () =>{
    console.log("Listening on port 8080");
})