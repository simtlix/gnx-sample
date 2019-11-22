

# MongoDB 


## Queries

### Find everything inside a collection named book
```javascript
db.book.find()
```

### Get only name of collection book
```javascript
db.book.find({}, {name:true, _id:false})

// resultados
{ "name" : "book junior 1" }
{ "name" : "book claudio 1" }
```

### Find books with pages greater than 100
```javascript
db.book.find({pages: {$gt:150}})

{
	"_id" : ObjectId("5dcb3de15a750b2172c75e83"),
	"pages" : 200,
	"name" : "book claudio 1",
	"authorID" : ObjectId("5dcb3de15a750b2172c75e7b"),
	"ISBN" : {
		"country" : "argentina",
		"number" : "222"
	},
	"categories" : [
		{
			"_id" : ObjectId("5dcb3de15a750b2172c75e85"),
			"name" : "economia",
			"category_ID" : ObjectId("5dcb3de15a750b2172c75e7e")
		}
	],
	"__v" : 0
}
```

### Find and filter by nested value

```javascript
// having this in the collection book
{
   "_id":ObjectId("5dcb3de15a750b2172c75e80"),
   "pages":100,
   "name":"book junior 1",
   "authorID":ObjectId("5dcb3de15a750b2172c75e7a"),
   "ISBN":{
      "country":"argentina",
      "number":"111"
   },
   "categories":[
      {
         "_id":ObjectId("5dcb3de15a750b2172c75e82"),
         "name":"ciencia",
         "category_ID":ObjectId("5dcb3de15a750b2172c75e7f")
      }
   ],
   "__v":0
}{
   "_id":ObjectId("5dcb3de15a750b2172c75e83"),
   "pages":200,
   "name":"book claudio 1",
   "authorID":ObjectId("5dcb3de15a750b2172c75e7b"),
   "ISBN":{
      "country":"argentina",
      "number":"222"
   },
   "categories":[
      {
         "_id":ObjectId("5dcb3de15a750b2172c75e85"),
         "name":"economia",
         "category_ID":ObjectId("5dcb3de15a750b2172c75e7e")
      }
   ],
   "__v":0
}

// find all books with ISBN from argentina
db.book.find( {"ISBN.country": "argentina"} )

// the next find is equivalent but won't resolve if you exec this on the cli
db.book.find( {"ISBN": {"country": "argentina"} )


// result
{
	"_id" : ObjectId("5dcb3de15a750b2172c75e80"),
	"pages" : 100,
	"name" : "book junior 1",
	"authorID" : ObjectId("5dcb3de15a750b2172c75e7a"),
	"ISBN" : {
		"country" : "argentina",
		"number" : "111"
	},
	"categories" : [
		{
			"_id" : ObjectId("5dcb3de15a750b2172c75e82"),
			"name" : "ciencia",
			"category_ID" : ObjectId("5dcb3de15a750b2172c75e7f")
		}
	],
	"__v" : 0
}
{
	"_id" : ObjectId("5dcb3de15a750b2172c75e83"),
	"pages" : 200,
	"name" : "book claudio 1",
	"authorID" : ObjectId("5dcb3de15a750b2172c75e7b"),
	"ISBN" : {
		"country" : "argentina",
		"number" : "222"
	},
	"categories" : [
		{
			"_id" : ObjectId("5dcb3de15a750b2172c75e85"),
			"name" : "economia",
			"category_ID" : ObjectId("5dcb3de15a750b2172c75e7e")
		}
	],
	"__v" : 0
}


// find all with category named ciencia
db.book.find( {"categories.name": "ciencia"} )

// the next find is equivalent but won't resolve if you exec this on the cli
db.book.find( {"categories": {"name": "ciencia"} )

// result
{
	"_id" : ObjectId("5dcb3de15a750b2172c75e80"),
	"pages" : 100,
	"name" : "book junior 1",
	"authorID" : ObjectId("5dcb3de15a750b2172c75e7a"),
	"ISBN" : {
		"country" : "argentina",
		"number" : "111"
	},
	"categories" : [
		{
			"_id" : ObjectId("5dcb3de15a750b2172c75e82"),
			"name" : "ciencia",
			"category_ID" : ObjectId("5dcb3de15a750b2172c75e7f")
		}
	],
	"__v" : 0
}
```

### Find all books of author named "junior"
```javascript
let books = Author.aggregate([
    { $match: {name: "junior"} },
    {
        $lookup: {
            from: "book",
            foreignField: "authorID",
            localField: "_id",
            as: "matched_books"
        },
    }
]).exec(function(err, results) {
    console.log(JSON.stringify(results));
})
```

### resultado
```javascript
[
   {
      "_id":"5dca0474e85d176374670b87",
      "name":"junior",
      "age":25,
      "__v":0,
      "matched_books":[
         {
            "_id":"5dca0474e85d176374670b8b",
            "pages":100,
            "name":"book junior 1",
            "authorID":"5dca0474e85d176374670b87",
            "__v":0
         },
         {
            "_id":"5dca0474e85d176374670b8d",
            "pages":200,
            "name":"book junior 2",
            "authorID":"5dca0474e85d176374670b87",
            "__v":0
         }
      ]
   }
]
```

### 



### Find all books of author named "junior" AND with more than 105 pages
```javascript
let books = Author.aggregate([
    { $match: {name: "junior", pages: {$gt: 100}} },
    {
        $lookup: {
            from: "book",
            foreignField: "authorID",
            localField: "_id",
            as: "matched_books"
        },
    }
]).exec(function(err, results) {
    console.log(JSON.stringify(results));
})
```

## Aggregations

find all books with more than 150 pages
```javascript
 db.book.aggregate([ { $match: { pages: { $gt: 150 } } } ])
```

sum all pages written by author named junior
```javascript
db.author.aggregate([
    { $match: { {name: "junior"} } },
    
    { $group: { _id: "$_id", total: {$sum: "$pages"}} }
])
```

## Insert


## Update 



## Delete 

delete everything inside collection book
```javascript
db.book.remove({})
```

