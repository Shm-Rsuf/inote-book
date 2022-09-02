const mongoose = require('mongoose')
mongooseURI ='mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const ConnectToMongo = ()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('Connected To Mongo Successfully')
    })
}

module.exports = ConnectToMongo;