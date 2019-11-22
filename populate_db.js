const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const Category = require('./models/category')

const connexion = 'mongodb://localhost:27017,localhost:27018,localhost:27019/example'

mongoose.connect(`${connexion}`, { replicaSet: 'rs' })

mongoose.connection.once('open', () => {
  console.log('conneted to database')
})

function handleError (err) {
  console.log('HUBO UN ERROR:', JSON.stringify(err))
}

const junior = new Author({
  name: 'junior',
  age: 25
})

junior.save(function (err) {
  if (err) return handleError(err)
})

const claudio = new Author({
  name: 'claudio',
  age: 30
})

claudio.save(function (err) {
  if (err) return handleError(err)
})

const dario = new Author({
  name: 'dario',
  age: 42
})

dario.save(function (err) {
  if (err) return handleError(err)
})

const paola = new Author({
  name: 'paola',
  age: 28
})

paola.save(function (err) {
  if (err) return handleError(err)
})

console.log(junior._id)

const cat1 = new Category({
  name: 'economia'
})

cat1.save()

const cat2 = new Category({
  name: 'ciencia'
})

cat2.save()

const book1 = new Book({
  _id: new mongoose.Types.ObjectId(),
  pages: 100,
  name: 'book junior 1',
  authorID: junior._id,
  ISBN: {
    country: 'argentina',
    number: 111
  },
  categories: [
    {
      name: 'ciencia',
      category_ID: cat2._id
    }
  ]
})

book1.save(function (err) {
  if (err) return handleError(err)
})

const book2 = new Book({
  _id: new mongoose.Types.ObjectId(),
  pages: 200,
  name: 'book claudio 1',
  authorID: claudio._id,
  ISBN: {
    country: 'argentina',
    number: 222
  },
  categories: [
    {
      name: 'economia',
      category_ID: cat1._id
    }
  ]
})

book2.save(function (err) {
  if (err) return handleError(err)
})

// /*
//  Ejemplo: path: "factura.local"
//  */
// let factura2 = Factura.aggregate([
//     {
//         "$lookup": {
//             from: 'local',
//             localField: 'id_local',
//             foreignField: '_id',
//             as: 'local',
//         }
//     },
//     { $unwind: { path: "$local", preserveNullAndEmptyArrays: true } },
//     {
//         "$lookup": {
//             from: 'ciudad',
//             localField: 'local.id_ciudad',
//             foreignField: '_id',
//             as: 'local_ciudad'
//         }
//     },
//     { $unwind: { path: "$ciudad", preserveNullAndEmptyArrays: true } },
// ]).exec(function (err, results) {
//     //console.log(JSON.stringify(results));
// });

// /*
//  Ejemplo: path: "factura.local.nombre_local"
//  */
// let factura3 = Factura.aggregate([
//     {
//         "$lookup": {
//             from: 'local',
//             localField: 'id_local',
//             foreignField: '_id',
//             as: 'local',
//         }
//     },
//     { $unwind: { path: "$local", preserveNullAndEmptyArrays: true } },
//     {
//         "$lookup": {
//             from: 'ciudad',
//             localField: 'local.id_ciudad',
//             foreignField: '_id',
//             as: 'local_ciudad'
//         }
//     },
//     { $unwind: { path: "$ciudad", preserveNullAndEmptyArrays: true } },
//     {
//         $match: { "local.nombre_local": "carniceria claudio" },
//     }
// ])
//     .exec(function (err, results) {
//         console.log(JSON.stringify(results));
//         /*
//         [
//            {
//               "_id":"5dc958cf58cbd4015c324a19",
//               "tipo":"A",
//               "concepto":"pago",
//               "id_local":"5dc958cf58cbd4015c324a15",
//               "items":[
//                  {
//                     "_id":"5dc958cf58cbd4015c324a1a",
//                     "nombre_item":"Matambre"
//                  }
//               ],
//               "__v":0,
//               "local":{
//                  "_id":"5dc958cf58cbd4015c324a15",
//                  "nombre_local":"carniceria claudio",
//                  "id_ciudad":"5dc958cf58cbd4015c324a13",
//                  "__v":0
//               },
//               "local_ciudad":[
//                  {
//                     "_id":"5dc958cf58cbd4015c324a13",
//                     "nombre_ciudad":"carlos paz",
//                     "id_provincia":"5dc958cf58cbd4015c324a11",
//                     "__v":0
//                  }
//               ]
//            }
//         ]
//         */
//     });

// /*
// */
// let factura4 = Factura.aggregate([
//     {
//         $lookup: {
//             from: "local",
//             localField: "id_local",    // field in the orders collection
//             foreignField: "_id",  // field in the items collection
//             as: "full_factura"
//         }
//     },
//     {
//         $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$full_factura", 0] }, "$$ROOT"] } }
//     },
//     { $project: { full_factura: 0 } },
//     {
//         $lookup: {
//             from: "ciudad",
//             localField: "id_ciudad",    // field in the orders collection
//             foreignField: "_id",  // field in the items collection
//             as: "full_factura2"
//         }
//     },
//     {
//         $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$full_factura2", 0] }, "$$ROOT"] } }
//     },
//     { $project: { full_factura2: 0 } },
//     {
//         $lookup: {
//             from: "provincia",
//             localField: "id_provincia",    // field in the orders collection
//             foreignField: "_id",  // field in the items collection
//             as: "full_factura3"
//         }
//     },
//     {
//         $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$full_factura3", 0] }, "$$ROOT"] } }
//     },
//     { $project: { full_factura3: 0 } },

// ]).exec(function (err, results) {
//     //console.log(JSON.stringify(results));
// });

// console.log("---------- finished ----------");
