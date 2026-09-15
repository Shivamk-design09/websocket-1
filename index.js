const express = require("express")
const http = require("http")
const path = require("path")
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)
// is http server is saath socket io bhi attach kardo
const io = new Server(server)
app.use(express.static(path.resolve('./public')))


// socket io connection
// socket is like an user
io.on('connection', (socket) => {
    console.log('new user is connected', socket.id)
    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
})

app.get('/', (req, res) => {
    return res.sendFile('./public/index.html')
})



server.listen(9000, () => console.log(`server is listening on PORT:9000`))