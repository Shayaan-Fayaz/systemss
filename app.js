const path = require('path');
const http = require('http');
const express = require('express');
const multer = require('multer');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const systemInformation = require('systeminformation');

const systemRouter = require('./router/systemRouter');
const viewRouter = require('./router/viewRouter');
const userRouter = require('./router/userRouter');

const app = express();
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

mongoose.connect('mongodb://127.0.0.1:27017/systemss').then(console.log('DB connection successful'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

const io = socketio(server);

io.on('connection', socket => {
    console.log('New WS connected...');

    socket.emit('message', 'Welcome new user');
    // socket.broadcast.emit('message', 'A new user has joined');
    
    socket.on('cpuUsageFetched', data => {
        socket.emit('cpuDataUpdate', data);
    })
})


app.use('/', viewRouter);
app.use('/api/v1/system', systemRouter);
app.use('/api/v1/user', userRouter);


server.listen(3000, () => {
    console.log('App running on port 3000')
})