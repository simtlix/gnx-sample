To run this app:

# Install
## nvm (Node Version Manager)
[nvm](https://github.com/nvm-sh/nvm)
## run-rs
[run-rs](https://www.npmjs.com/package/run-rs)
```bash
npm install run-rs -g
```
## mongo-express
[mongo-express](https://www.npmjs.com/package/mongo-express)
```bash
npm install -g mongo-express
```
## Download npm dependencies
At the project root folder run
```bash
npm install
```

# Run
Start mongodb with replica sets
```bash
run-rs
```

Populate DB
```bash
node populate_db.js
```

Start node app
```bash
node app.js
```

To test the GraphQL queries through GraphiQL access to
localhost:3000/graphql

# Extras
To interact with mongodb you can use mongo-express
```bash
mongo-express -U "mongodb://localhost:27017,localhost:27018,localhost:27019/example?replicaSet=rs"
```