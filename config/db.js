const settings = require('./settings')
const mongoose = require('mongoose')

// const { MongoClient } = require('mongodb')
// const client = new MongoClient(settings.MONGODB_URI);
// async function run() {
//     try{
//         const db = await client.db('tempdb');
//         const collection = db.collection('products')
//         const result = await collection.find()
//         console.log(result);
    
//     } catch (err){
//         console.log(err)
//     } finally {
//         client.close()
//         console.log('connection closef')
//     }
// }
// run()

async function connectDB(){
    try{
        const client = await mongoose.connect(settings.MONGODB_URI)
        console.log("Succesfully connected to MongoDB!")
    } catch(err){
        console.log("Failed to connect to MongoDb", err.message)
        process.exit(1);
    }
}

module.exports = connectDB;
