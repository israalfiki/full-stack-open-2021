const express = require('express')
const morgan = require('morgan')

require('dotenv').config()

const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })


app.use(morgan(':method :url :status :type :res[content-length] - :response-time ms')
)




let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    Person.find()
    .then((persons)=>{
        res.json(persons)        
    })
    .catch(err=>console.log(err))
    
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id;
    Person.findById(id)
    .then((person)=>{
        if(person){
            res.json(person)
        }else{
            res.statusMessage = "Not found!"
            res.status(404).end()
        }
    })
    .catch(err=>console.log(err))
   
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id;
    Person.deleteOne({id:id})
    .then((result)=>{
        console.log('deleted!')
        res.send(204).end()
    })
    .catch(err=>console.log(err))

})

app.post('/api/persons',async (req,res)=>{
    const name = req.body.name
    const number = req.body.number

    const persons = await Person.find()

    if(!name){
        return res.status(400).json({"error":"name is missing"})
    }
    else if(persons.some(person=>person.name===name)){
        return res.status(400).json({"error":"name must be unique"})
    }

    if(!number){
        return res.status(400).json({
            "error":"number is missing"
        })
    }


    const person = new Person({
        name:name,
        number:number
    })

    person.save()
    .then((person)=>{
        console.log('saved!')
        res.json(person)
    })
    .catch(err=>console.log(err))
    
})

app.get('/api/info',async (req,res)=>{
    const date =new Date()
    let persons = await Person.find()
    res.write(`Phonebook has info for ${persons.length} people\n`)
    res.write(date.toString())
    res.end()
})


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})