const express = require('express');
const { connectToDb, getDb } = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log("Server running at port 5000");
        });
        db = getDb();
    }
});
let db;


app.post('/api/submitFormData', async (req, res) => {
    try {
        const formData = req.body;
        // Process the received form data (e.g., save to a database)
        console.log('Received form data:', formData.userId);

        // Query the database for user profile
        const users = await db.collection('userProfile').findOne({ userId: formData.userId });

        console.log('Users:', users);

        // Insert data into partners collection if user profile found
        if (users) {
            await db.collection('partners').insertOne({
                userId: formData.userId,
                date: formData.date,
                name: users.name,
                startpoint: formData.startpoint,
                endpoint: formData.endpoint,
                personality: formData.personality,
                type: formData.type,
                visitingPoints: formData.visitingPoints,
                rating: users.rating // Assuming rating is available in users object
            });

            console.log('Data inserted into partners collection');
        } else {
            console.log('User profile not found');
        }

        res.status(200).json(users); // Send user profile data as response
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).json({ error: 'Could not process the form data' });
    }
});









/*app.post('/api/submitFormData', async (req, res) => {
    try {
        const formData = req.body;
        // Process the received form data (e.g., save to a database)
        console.log('Received form data:', formData.userId);

        // Query the database for user profile
        const users = await db.collection('userProfile').findOne({ userId: formData.userId });

        console.log('Users:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Could not fetch user profile' });
    }
      await db.collection('partners').insertOne({
        userId: formData.userId,
        name: formData.name,
        startpoint: formData.startpoint,
        endpoint: formData.endpoint,
        personality: formData.personality,
        type: formData.type,
        visitingPoints: formData.visitingPoints,
        rating:users.rating
       });
});*/



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

/*app.get("/user", (req, res) => {
    let users = [];
    db.collection('userProfile')
        .find({userId : 400})
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch documents' });
        });
});*/


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
