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


const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel= require('./models/Users');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/community')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

app.post('/upload', upload.single('file'), (req, res) => {
    UserModel.create({
        caption: req.body.caption,
        userId: req.body.userId,
        location: req.body.location,
        image: req.file.filename})
    .then(result=> res.json(result))
    .catch(err=> console.log(err))
});


app.get('/getImage',(req,res)=>{
    UserModel.find()
    .then(users =>res.json(users))
    .catch(err => res.json(err))
})



