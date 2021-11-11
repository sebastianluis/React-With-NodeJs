
## Project setup
```
npm install
```

### Run
```
node server.js
```

### Database 
Create a database in mysql and update the credentials, db name in db.config file and run the project

Two tables will be created
1. types 
2. products 

### Insert product types
INSERT INTO types (name) VALUES ('Foam');
INSERT INTO types (name) VALUES ('Adhesives');
INSERT INTO types (name) VALUES ('Films');
INSERT INTO types (name) VALUES ('Rubber Sheet');

Call the POST api/product/create endpoint to insert 4000 sample records

