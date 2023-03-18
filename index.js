const express = require('express')

const http = require('http')
const socketio = require('socket.io')
const formatMessages = require('./utility/utilityFunctions')
const kitchen = require('./model/kitchen')
const fetch = require('./model/fetch')
const cookieParser = require('cookie-parser')

const session = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    }

});

const socket_io_session = require('@kobalab/socket.io-session')(session);

const app = express()

const port = 3000 || process.env.PORT

app.use(session)

app.use(cookieParser())

const server = http.createServer(app)
const io = socketio(server);



let improveCount = 0
let improve = 2

io.use(socket_io_session.express_session);

//Run when client connects
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected....`)

    //Emit a message when a user connects.
    socket.emit('message', formatMessages('Uyai Restaurant Bot', `Welcome to Uyai Ndidia Resturant.<br>

    Please input <b> Menu</b> to see options`))

    //Listen for UyaiRestaurantBot messages from client end
    socket.on('UyaiRestaurantBot', (msg) => {

        //   console.log(msg)
        console.log(socket.request.session);
        socket.request.session.UyaiRestaurantBot = msg
        socket.request.session.save();
        socket.emit('chats', formatMessages(`User`, msg))

        // CONDITIONAL STATEMENT
        switch (msg) {
            case "menu":
                console.log('This is menu', msg)
                socket.emit('MenuOption')
                break
        }

        switch (improveCount) {
            case 0:
                switch (msg) {
                    case "1":
                        socket.emit('food menu', kitchen)
                        improveCount = 1
                        break
                }
                break
            case 1:
                switch (msg) {
                    case "01":
                        switch (improve) {
                            case 2:
                                console.log('Afang Soup')
                                fetch.save(kitchen.afangSoup)
                                socket.emit('message', formatMessages('Uyai Restaurant Bot',
                                    `Order for ${Object.values(kitchen.afangSoup.title).join('')}
                               Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                break
                        }
                        break
                    case "02":
                        switch (improve) {
                            case 2:
                                fetch.save(kitchen.garri)
                                socket.emit('message', formatMessages('Uyai Restaurant Bot',
                                    `Order for ${Object.values(kitchen.garri.title).join('')}
                                Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                break
                        }
                        break
                    case "03":
                        switch (improve) {
                            case 2:
                                fetch.save(kitchen.riceAndStew)
                                socket.emit('message', formatMessages('Resturant-chat',
                                    `Order for ${Object.values(kitchen.riceAndStew.title).join('')}
                                Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                break
                        }
                        break
                    case "04":
                        switch (improve) {
                            case 2:
                                fecth.save(kitchen.egusi)
                                socket.emit('message', formatMessages('Resturant-chat',
                                    `Order for ${Object.values(kitchen.egusi.title).join('')}
                               Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                break
                        }
                        break
                    case "05":
                        switch (improve) {
                            case 2:
                                fetch.save(kitchen.okpa)
                                socket.emit('message', formatMessages('Resturant-chat',
                                    `Order for ${Object.values(kitchen.okpa.title).join('')}
                               Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                               improveCount = 0
                                break
                        }
                        improveCount = 0
                        break
                }
                improveCount = 0
                break
        }
        switch (msg) {
            case "99":
                if (fetch.getCart() === null) {
                    socket.emit('message', formatMessages('Resturant-chat', `No order to place.<br>Please select <b> 1 </b> to see list of food items`))
                } else {
                    console.log(fetch.getCart())
                    socket.emit('message', formatMessages('Resturant-chat', `Order placed.<br>Please select <b> 97 </b> to see current order`))
                }
                improveCount = 0
                break
        }
        switch (msg) {
            case "97":
                if (fetch.getCart() === null) {
                    socket.emit('message', formatMessages('Resturant-chat', `No order to place.<br>Please select <b> 1 </b> to see list of food items`))
                } else {
                    console.log(fetch.getCart())
                    socket.emit('CurrentOrder', fetch.getCart())
                }
                improveCount = 0
                break
        }

    })

    socket.on('disconnect', () => {
        console.log('disconnected...')
    })
})

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    response.render('orderchat')
})

server.listen(
    port, () => {
        console.log(`server is listening at http://localhost:${port}`)
    }
)























