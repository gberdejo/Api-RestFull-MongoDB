const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect( process.env.MONGODB, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        } )   ;

        console.log("Base de datos conectado");
    } catch (error) {
        console.log(error);
        throw new Error("Erroe en la DB");           
    }

}

module.exports= {
    dbConnection
}

