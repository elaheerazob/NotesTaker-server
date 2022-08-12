const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app =express()


//wtLxw8UCavgOodgR




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ridwan:wtLxw8UCavgOodgR@cluster0.tdnhswv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        const collection = client.db("notesTaker").collection("notes");
        console.log('Connected DB');
    }
    finally{

    }
}
run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
// //   client.close();
// console.log('connected DB');
// });


app.get('/',(req,res) =>{
    res.send('Hello razob')
})

app.listen(port,() =>{
    console.log(`Connect`,port)
})