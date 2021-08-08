const mongoose = require('mongoose')
const { fg, reset } = require('./colors')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    .then(() => {
        console.log(`========>${fg.yellow} MongoDB is connected ${reset}<========`)
    })
    .catch((error) => {
        console.log(`====>${fg.red} Mongo Connection failed ${reset} <====`)
        console.log(error)
        process.exit(1)    
    })
    