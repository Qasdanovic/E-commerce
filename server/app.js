const express = require('express')
require('dotenv')
const cors = require('cors')

const app = express()

//Routers
const ProductsRouter = require('./routes/ProductsRouter')
const userRouter = require('./routes/UserRouter')


//middlewares
app.use(cors())
app.use(express.json())


//Routes
app.use('/products', ProductsRouter)
app.use('/users', userRouter)


app.listen(process.env.PORT || 8080, () => {
    console.log('server running!');
})