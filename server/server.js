const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log("Server running at port 5000");
        });
        db = getDb();
    }
});

app.get("/api", (req, res) => {
    let partners = [];
    db.collection('partners')
        .find()
        .forEach(partner => partners.push(partner))
        .then(() => {
            res.status(200).json(partners);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch documents' });
        });
});

app.post("/api", (req, res) => {
    const partner = req.body;
    db.collection('partners')
        .insertOne(partner)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.get("/user", (req, res) => {
    let users = [];
    db.collection('userProfile')
        .find()
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch documents' });
        });
});


/*const express= require('express')

const { connectToDb, getDb }= require('./db')
const app= express()
app.use(express.json())

let db

connectToDb((err)=>{
    if(!err){
    app.listen(5000,()=> {console.log("server running at port 5000")})
    db=getDb()
}


})


app.get("/api",(req,res)=>{
    let partners=[]
    db.collection('partners')
    .find() //cursor toArray forEach
    
    .forEach(partner=> partners.push(partner))
    .then(()=>{
        res.status(200).json(partners)
    })
    .catch(()=>{
        res.status(500).json({error:'could not fetch docs'}) 
    })
    
})

app.post("/api",(req,res)=>{
    const partner=req.body
    db.collection('partners')
    .insertOne(partner)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({err: 'could not create new document'})
    })
})
 
app.get("/user",(req,res)=>{
    let users=[]
    db.collection('userProfile')
    .find() //cursor toArray forEach
    
    .forEach(user=> userProfile.push(user))
    .then(()=>{
        res.status(200).json(userProfile)
    })
    .catch(()=>{
        res.status(500).json({error:'could not fetch docs'}) 
    })
    
})*/


/*app.post("/api", async (req, res) => {
    try {
        const partner = req.body;

        // Lookup the user's profile to get the rating
        const userProfile = await db.collection('userProfile').findOne({ userId: partner.userId });

        // If userProfile is found, copy its rating to the partner
        if (userProfile) {
            partner.rating = userProfile.rating;
        }

        // Insert the new partner into the partners collection
        const result = await db.collection('partners').insertOne(partner);

        res.status(201).json(result);
    } catch (err) {
        console.error('Error adding new partner:', err);
        res.status(500).json({ err: 'Could not create new document' });
    }
});*/
