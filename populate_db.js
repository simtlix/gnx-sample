const mongoose = require('mongoose')

const connexion = 'mongodb://localhost:27017,localhost:27018,localhost:27019/example'

mongoose.connect(`${connexion}`, { replicaSet: 'rs' })
const Book = require('./models/book')
const Author = require('./models/author')
const City = require('./models/city')
const Category = require('./models/category')

mongoose.connection.once('open', () => {
  console.log('conneted to database')
})

function handleError (err) {
  console.log('HUBO UN ERROR:', JSON.stringify(err))
}

const carlos_paz = new City({
  name: "carlos paz",
  population: 50000
})

const plottier = new City({
  name: "plottier",
  population: 40000
})

const rosario = new City({
  name: "rosario",
  population: 1000000
})

const bariloche = new City({
  name: "bariloche",
  population: 100000
})

carlos_paz.save(function (err) {
  if (err) return handleError(err);
})

plottier.save(function (err) {
  if (err) return handleError(err);
})

rosario.save(function (err) {
  if (err) return handleError(err);
})

bariloche.save(function (err) {
  if (err) return handleError(err);
})


const junior = new Author({
  name: "junior",
  age: 25,
  cityID: plottier._id
})

junior.save(function (err) {
  if (err) return handleError(err);
});


const claudio = new Author({
  name: "claudio",
  age: 30,
  cityID: carlos_paz._id
})

claudio.save(function (err) {
  if (err) return handleError(err);
});

const dario = new Author({
  name: "dario",
  age: 42,
  cityID: rosario._id
})

dario.save(function (err) {
  if (err) return handleError(err);
});


const paola = new Author({
  name: "paola",
  age: 28,
  cityID: bariloche._id
})

paola.save(function (err) {
  if (err) return handleError(err);
});

console.log(junior._id);



const cat1 = new Category({
  name: "economia"
});

cat1.save();

const cat2 = new Category({
  name: "ciencia"
});

cat2.save()



const book1 = new Book({
  _id: new mongoose.Types.ObjectId(),
  pages: 100,
  name: "book junior 1",
  authorID: junior._id,
  ISBN: {
      country: "argentina",
      number: 111
  },
  categories:[
      {
          category_ID: cat2._id
      },
      {
          category_ID: cat1._id
      },
  ]
});

book1.save(function (err) {
  if (err) return handleError(err);
});

const book2 = new Book({
  _id: new mongoose.Types.ObjectId(),
  pages: 200,
  name: "book claudio 1",
  authorID: claudio._id,
  ISBN: {
      country: "argentina",
      number: 222
  },
  categories:[
      {
          category_ID: cat1._id
      }
  ]
});

book2.save(function (err) {
  if (err) return handleError(err);
});