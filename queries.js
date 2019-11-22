const mongoose = require('mongoose')
const Author = require('./models/author')

const connexion = 'mongodb://localhost/'

mongoose.connect(`${connexion}`)

mongoose.connection.once('open', () => {
  console.log('conneted to database')
})

// ### Find all books of author named "junior"
// book(path: "author.name", operator: "eq", value: "junior")
Author.aggregate([
  { $match: { name: 'junior' } },
  {
    $lookup: {
      from: 'book',
      foreignField: 'authorID',
      localField: '_id',
      as: 'matched_books'
    }
  }
// eslint-disable-next-line handle-callback-err
]).exec(function (err, results) {
  // console.log("find all books of author named junior")
  // console.log(JSON.stringify(results));
})

// todos los libros de junior que tengan mas de 100 paginas
Author.aggregate([
  { $match: { name: 'junior' } },
  {
    $lookup: {
      from: 'book',
      as: 'matched_books',
      let: { book_pages: '$book_pages' },
      pipeline: {
        $match: {
          $expr: {
            $and: [
              { $gt: [150] }
            ]
          }
        }
      }
    }
  }

// eslint-disable-next-line handle-callback-err
]).exec(function (err, results) {
  console.log(JSON.stringify(results))
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

console.log('---------- finished ----------')
