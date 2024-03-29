const { MongoClient }= require('mongodb')
let dbConnnection 
module.exports={
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/community')
        .then((client)=>{
            dbConnection = client.db()
            return cb()
        })
        .catch(err=>{
            console.log(err)
            return cb(err)
        })
    },
    getDb: ()=> dbConnection
    
}