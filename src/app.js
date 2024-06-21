//npm init -y

const mongoose = require('mongoose');
//validator is installed using npm(npm i validator) for validating email,password etc..
const validator=require('validator');
// Replace the following with your MongoDB connection string.
const uri = 'mongodb://localhost:27017/info';

// Options to deal with deprecation warnings
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Connect to the database
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
//defining schema
  const myschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:30,
        uppercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    videos:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error("videos count cannot be negative");
            }
        }
    },
    course:{
        type:String,
        required:true,
        enum:["cse","it","aids"],
        lowercase:true
    }
  });
//creating collection model using scheme
//remember to keep collection name in quotes
const mymodel=mongoose.model('Details',myschema);

//inserting documents

const insertOne = async () => {
    const newDocument = new mymodel({
      name: 'John Doe',
      email:'akhila@gmail.com',
      videos: 5,
      course: 'cse'
    });
  
    try {
      const result = await newDocument.save();
      console.log('Document inserted:', result);
    } catch (err) {
      console.error('Error inserting document:', err);
    }
  };
  
  // Insert Many (Create)
  const insertMany = async () => {
    const documents = [
      { name: 'Alice', videos: 3, course: 'it' },
      { name: 'Bob', videos: 7, course: 'aids' },
      { name: 'Charlie', videos: 2, course: 'cse' }
    ];
  
    try {
      const result = await MyModel.insertMany(documents);
      console.log('Documents inserted:', result);
    } catch (err) {
      console.error('Error inserting documents:', err);
    }
  };
  
  // Read
  const readDocuments = async () => {
    try {
      const documents = await MyModel.find({});
      console.log('Documents found:', documents);
    } catch (err) {
      console.error('Error reading documents:', err);
    }
  };
  
  // Update
  const updateDocument = async (id) => {
    try {
      const result = await MyModel.findByIdAndUpdate(id, { videos: 10 }, { new: true });
      console.log('Document updated:', result);
    } catch (err) {
      console.error('Error updating document:', err);
    }
  };
  
  // Delete
  const deleteDocument = async (id) => {
    try {
      const result = await MyModel.findByIdAndDelete(id);
      console.log('Document deleted:', result);
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };
  
  // Run CRUD operations sequentially
  const runCrudOperations = async () => {
    await insertOne();
    // await insertMany();
    // await readDocuments();
    // Replace with actual document ID after you get it from readDocuments
    // await updateDocument('put_the_document_id_here');
    // await deleteDocument('put_the_document_id_here');
  };

  runCrudOperations();

  