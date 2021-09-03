const express = require('express')
const app = express()

app.use(express.json())

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
    res.json(data)
    
})

app.get('/api/persons/:id',(req,res)=>{
    const id = +req.params.id;
    const person = data.find(person=>person.id===id)
    if(person){
        res.json(person)
    }else{
        res.statusMessage = "Not found!"
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = +req.params.id;
    data= data.filter(person=>person.id!==id)
    res.send(204).end()

})

app.post('/api/persons',(req,res)=>{
    const name = req.body.name
    const number = req.body.number

    if(!name){
        return res.status(400).json({"error":"name is missing"})
    }
    else if(data.some(person=>person.name===name)){
        return res.status(400).json({"error":"name must be unique"})
    }

    if(!number){
        return res.status(400).json({
            "error":"number is missing"
        })
    }

    const person = {
        id: Math.random(),
        name:name,
        number:number
    }

    data.push(person)
    res.json(person)

    
})

app.get('/api/info',(req,res)=>{
    const date =new Date()
    res.write(`Phonebook has info for ${data.length} people\n`)
    res.write(date.toString())
    res.end()
})




const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})