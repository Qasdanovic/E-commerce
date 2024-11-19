const express = require('express')
require('dotenv')
const ProductsRouter = require('./routes/ProductsRouter')
const cors = require('cors')

const app = express()

//middlewares
app.use(cors())


//Routes
app.use('/products', ProductsRouter)


app.listen(process.env.PORT || 8080, () => {
    console.log('server running!');
})