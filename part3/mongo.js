const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const uri =`mongodb+srv://newuser9521:${password}@cluster0.ije5z.mongodb.net/people?retryWrites=true&w=majority`

//connection to databse 
mongoose.connect(uri)

//creating schema
personsSchema = new mongoose.Schema({
    name:String,
    number:String
})

//creating model
const Person = mongoose.model('Person',personsSchema)

//creating new entry
const person = new Person({
    name:name,
    number:number
})

if(name&&number){
    person.save()
    .then(()=>{
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
.catch(err=>console.log(err))

}
else{
    Person.find()
    .then(persons=>{
        if(persons.length>0){
            console.log('phonebook:')
        persons.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })

        }
        else{
            console.log("No entries in the phonebook.")
        }
        mongoose.connection.close()

        
    })
    .catch(err=>console.log(err))

}
