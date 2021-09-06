const mongoose = require('mongoose')

const name = process.argv[3]
const number = process.argv[4]

const uri =process.env.MONGODB_URI

//connection to databse 
mongoose.connect(uri)

//creating schema
personsSchema = new mongoose.Schema({
    name:String,
    number:String
})

personsSchema.set('toJSON',{
    transform:(doc,returnedObj)=>{
        returnedObj.id= returnedObj._id.toString()
        delete returnedObj._id 
        delete returnedObj.__v

    }
})

//creating model
const Person = mongoose.model('Person',personsSchema)


module.exports = Person
