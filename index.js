const express = require('express')
const app = express()


// const morgan = require('morgan')

// morgan.token('NAME', function (req, res) { return req.body.name})
// morgan.token('NUMBER', function (req, res) { return req.body.number})


app.use(express.static('dist'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :NAME :NUMBER'))
let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    },
    {
        id: 4,
        name: "Maryy Poppendick",
        number: "39-23-6423122"
      }
  ]

  app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.get('/info',(request, response) => {
    console.log(persons.length)
    const date = new Date()
    //const amount = Number(request.)
    response.json({Message:`phonebook has info for ${persons.length} people`, date:date})
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    const etsittävä = persons.find(person => person.name === body.name)
    if (etsittävä) {
      return response.status(400).json({
        error: 'There is already person with this same'
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })