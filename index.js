const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

//middle ware
app.use(cors());
app.use(express.json());

//wtLxw8UCavgOodgR

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ridwan:wtLxw8UCavgOodgR@cluster0.tdnhswv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const notesCollection = client.db("notesTaker").collection("notes");

    //get api to read all nodes
    //http://localhost:5000/notes
    app.get("/notes", async (req, res) => {
      // const q =req.query;
      const cursor = notesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    //search

    app.get("/notes/:name", async (req, res) => {
      const query = req.params.name;
      const singleData = await notesCollection.find({ name: query }).toArray();
      res.send(singleData);
    });

    //querry pramiter

    /*  app.get("/notes", async (req, res) => {
      const q = req.query;
      console.log(q);

      const cursor = notesCollection.find( q);

      const result = await cursor.toArray();

      res.send(result);
    }); */

    //create nodesTaker
    //http://localhost:5000/note
    /*  {
            "name": "Elahee",
            "age": 25,
            "address": "Rangpur Bangladesh"
        } */

    app.post("/note", async (req, res) => {
      const data = req.body;
      const result = await notesCollection.insertOne(data);

      res.send(result);
    });

    // update nodesTaker
    //http://localhost:5000/note/62f667935ec60a9c7c0699b1
    app.put("/note/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log(id,data);

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: data.name,
          address: data.address,
        },
      };
      const result = await notesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete NodesTaker
    app.delete("/note/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await notesCollection.deleteOne(filter);
      res.send(result);
    });

    console.log("Connected DB");
  } finally {
  }
}
run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
// //   client.close();
// console.log('connected DB');
// });

app.get("/", (req, res) => {
  res.send("Hello razob");
});

app.listen(port, () => {
  console.log(`Connect`, port);
});
