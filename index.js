const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.Port || 5000;
const app = express();

//middleware

app.use(cors());
app.use(express.json());


//userName: jobtask
//password: 60zDjDKX9Kantgpb

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.ty2hcly.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const dataCollections = client.db("jobTask").collection("formData");

        //send form data to db
        app.post('/formdata', async(req, res) => {
            const datas = req.body;
            const result = await dataCollections.insertOne(datas);
            res.send(result);
        });

        //get form data
        app.get('/data/:name', async(req, res) => {
            const name = req.params.name;
            const query = {name: name};
            const result = await dataCollections.findOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', async (req, res) => {
    res.send('Job Task Server is Running')
});

app.listen(port, () => {
    console.log(`Job Task Server is running on port: ${port}`)
});