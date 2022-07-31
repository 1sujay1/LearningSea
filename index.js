const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./v1/routes');

const http = require('http');
const config = require('./config/config');
const server = http.createServer(app)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'))

app.use(config.baseUrl+ "/api/v1",routes)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// mongoose.connect(process.env.MONGO_DD, {
//     useNewUrlParser: true, useUnifiedTopology: true
// })

//     .then(console.log("Connected to mongodb instance" + process.env.MONGO_DD))
//     .catch(err => {
//         console.error("Err0r connecting to mongodb", err)
// process.exit();
//     })


app.get('/', (req, res) => {
    return res.send("HOME PAGE")
})

// const getYoutubePlayLists = async () => {
//     let url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=aabc&maxResults=25&key=abcd`
//     let resp = await axios.get(url);
//     console.log(resp.data);
//     return resp;
// }




server.listen(process.env.APP_PORT, () => {
    console.log(`Listening to port ${process.env.APP_PORT}`)
})