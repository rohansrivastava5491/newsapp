import { set, connect } from "mongoose";


const connectDB = async () => {
    try{
        set('strictQuery', true);
        await connect(process.env.mongoURI, {
        useNewUrlParser: true,
        });
        console.log('MongoDB is connected..');
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;