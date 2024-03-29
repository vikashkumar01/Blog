const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary')
const fileupload = require('express-fileupload')
const auth = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true
}))

var corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "1800",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL, {
    useNewurlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("connected to mongoDB"))
    .catch((err) => (console.log(err)));


app.use('/api/v1/auth', auth);
app.use('/api/v1/users', userRoute)
app.use('/api/v1/posts', postRoute)

app.get('/',  (req, res)=>( 
    res.send('Server is working')
  ))


const port = process.env.PORT || 5000;

app.listen(port, console.log(`listening on port ${port}`));