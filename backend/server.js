const express = require('express')
const cookieParser = require('cookie-parser')
const toyService = require('./api/toy/toy.service.js')
// const userService = require('./services/user.service.js')
const cors = require('cors')
const panth = require('path')

const app = express()
const http = require('http').createServer(app)


// App configuration
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const toyRoutes = require('./api/toy/toy.routes.js')

app.use('/api/toy', toyRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Listen will always be the last line in our server!
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})


