const mongoose = require('mongoose');

const connecttodatabase = async ()=>{

  try{
    await mongoose.connect( process.env.MONGODB_URI
     );

    console.log("mongo connected successfully");
  } catch(error) {
    console.log(error);
    process.exit(1);

 }

};

module.exports = connecttodatabase;