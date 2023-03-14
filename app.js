const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()
require('express-async-errors')

const productRoutes = require('./routes/product')
const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes

app.get('/',(req,res) => {
    res.send('<h2>Devigu Store api</h2><a href="/api/v1/products">Products Route</a>')
})

// products routes
app.use('/api/v1/products', productRoutes)

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port = process.env.PORT || 8001

const start = async() => {
    try{
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Serving on port ${port}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()
