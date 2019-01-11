const MongoClient = require('mongodb').MongoClient;  
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url)
.then((client) => {

        console.log('Connected correctly to server');
        const db = client.db(dbname);

        dboper.insertDocument(db, 
            { 
                name : "Messha",
                description: "Test"

            }, 'dishes')
.then((result)=>{
                console.log('Insert Document:\n', result.ops);

               return dboper.findDocument(db,'dishes')
})
.then((result) => {
                    console.log('Found: \n', result);

                    return dboper.updateDocument(db,{ 
                        name : "Messha"
                    }, { description : 'Its new!'},'dishes')
                })
.then((result) => {
                        console.log('Updated the document: \n'+ result );

                        return dboper.findDocument(db,'dishes')
})
.then((result) => {
                            console.log('Found: \n', result);

                            return db.dropCollection('dishes')
})
.then((result) => {
                            console.log("Deleted the database: " + result);
                            client.close();
})
.catch((err) => {
    console.log(err);
})
})
.catch((err) => {
    console.log(err);
})
                    