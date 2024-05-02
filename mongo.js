// const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//  `mongodb+srv://joakimhaukilehto:${password}@cluster0.wdxk3x9.mongodb.net/`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
//   id : Number,
// })

// const generateId =  async () => {
//     try {
//     const maxId = await Person.findOne({}).sort({ id: -1 }).limit(1)
//     if (maxId) {
//         return maxId.id + 1
//     }
//     else {
//         return 1
//     }
//   } catch (error){
//     console.error('error', error)
//     throw error
// }
// }

// const Person = mongoose.model('Person', personSchema)

// if (process.argv.length == 5) {
// (async () => {
// const person = new Person({
//   name : process.argv[3],
//   number : process.argv[4],
//   id: await generateId(),
// })

// person.save().then(result => {
//   console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
//   mongoose.connection.close()
// })
// })()
// }


// if (process.argv.length < 5) {
//     console.log("phonebook:")
//     Person.find({}).then(persons => {
//         persons.forEach(person => {
//             console.log(person.name, person.number)
//         })
//         mongoose.connection.close()
//     })
    
//     }