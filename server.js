const app = require("express")
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const {getAllUsers, addUser} = require("./user")
const {getAllMessages, addMessage} = require("./messages")

http.listen(process.env.PORT || 3000, () => {
    console.log("Server Listining")
})

io.on("connection", (socket) => {
    console.log("connected ", socket.id)
    io.emit("connected", socket.client.conn.server.clientsCount)

    socket.on("disconnect", (reason) => {
        console.log("disconnected")
        io.emit("disconnected", socket.conn.server.clientsCount)
    })

    socket.on("getAllUsers", (currentUser) => {
        socket.emit("getAllUsers", getAllUsers(currentUser))
    })
 
    socket.on("addUser", (user) => {
        addUser({id: socket.id, ...user})
        io.emit("getAllUsers", getAllUsers(user.currentUser))
    })

    socket.on("msg", (obj) => {
        addMessage(obj)
        console.warn("obj", obj)
        // socket.broadcast.to().emit("getAllMessages", getAllMessages(obj))
    })

    socket.on("getAllMessages", (obj) => {
        io.emit("getAllMessages", getAllMessages(obj))
    })

    socket.on("getCountAllUsers", () => {
        io.emit("getCountAllUsers", socket.client.conn.server.clientsCount)
    })

    socket.on("types", () => {
        socket.broadcast.emit("types")
    })

    socket.on("blur", () => {
        socket.broadscast.emit("blur")
    })
})