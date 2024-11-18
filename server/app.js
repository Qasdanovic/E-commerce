const express = require('express')
require('dotenv')

const app = express()




app.listen(process.env.PORT, () => {
    console.log('server running!');
})