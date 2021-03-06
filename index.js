const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const cloudinary = require('cloudinary');
const path = require('path');

const auth = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL,{
    useNewurlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("connected to mongoDB"))
.catch((err)=>(console.log(err)));


app.use('/api/auth', auth);
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)


app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', (req, res) => {
    
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`listening on port ${port}`));