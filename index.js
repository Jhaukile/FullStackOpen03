require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
// const morgan = require('morgan')

// morgan.token('NAME', function (req, res) { return req.body.name})
// morgan.token('NUMBER', function (req, res) { return req.body.number})




app.use(express.static('dist'))
app.use(express.json())
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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/info',(request, response, next) => {
  console.log(persons.length)
  const date = new Date()
  //const amount = Number(request.)
  Person.findById().then( result => {
    console.log(result)
    response.json({Message: `phonebook has info for ${persons.length} people`, date:date})
  })
  .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    console.log(result)
    response.status(204).end()
  })
  .catch(error => next(error))
})

// const generateId =  async () => {
//   try {
//   const maxId = await Person.findOne({}).sort({ id: -1 }).limit(1)
//   if (maxId) {
//       return maxId.id + 1
//   }
//   else {
//       return 1
//   }
// } catch (error){
//   console.error('error', error)
//   throw error
// }
// }

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body
  // if (!body.name) {
  //   return response.status(400).json({ 
  //     error: 'name missing' 
  //   })
  // }
  // if (!body.number) {
  //   return response.status(400).json({ 
  //     error: 'number missing' 
  //   })
  // }
  // const etsittävä = await persons.findOne({ name: body.name })
  // if (etsittävä) {
  //   return response.status(400).json({
  //     error: 'There is already person with this same'
  //   })
  // }

const person = new Person({
  name: body.name,
  number: body.number,
})

// const saved = await person.save()
// response.json(saved)
person.save()
.then(savedPerson => {
  response.json(savedPerson)
})
.catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  