const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/routes')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/error-midleware')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.static('static'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(fileUpload({}))
app.use('/auth', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluster0.r9cvrno.mongodb.net', {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log('Listened on PORT = 5000'))
    } catch (e) {
        console.log(e)
    }
}

start()