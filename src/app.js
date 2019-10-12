const fs = require('fs');
const path = require('path');
const WebSocket = require('ws')
const http = require('http')
const express = require('express');

const app = new express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server })

const { accounts, users, writeJSON } = require('./data.js');

const accountRoutes = require('./routes/accounts.js')
const servicesRoutes = require('./routes/services.js')

app.set('views',path.join(__dirname, '/views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }));

//app.listen(3000, () => { console.log('PS Project Running on port 3000!') });

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('ho!')
// })

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
        console.log("dir name is: " + __dirname)
        //send immediately a feedback to the incoming connection

        var filePath = path.join("/var/log/", "system.log")
        //var filePath = path.join(__dirname, "../test.log")
        fs.watch(filePath, (eventType, filename) => {
            console.log("Event type: " + eventType);
            //ws.send("The file changed " + curr.size);
            fs.createReadStream(filePath).on("data", chunk => {
                ws.send(chunk.toString())
            })
        })
    });

    // console.log("dir name is: " + __dirname)
    // //send immediately a feedback to the incoming connection
    // fs.watchFile(path.join(__dirname, message), (curr, prev) => {
    //     console.log("file changed " + curr.size);
    //     ws.send("The file changed " + curr.size);
    // })
});

//start our server
server.listen(3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});