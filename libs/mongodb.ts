import mongoose from "mongoose"; //mongoose

let isConnected: boolean = false; //let is for global access variable and TS means typescript we have to define the variable

const connectMongoDB = async (): Promise<void> =>{ //async wait 5 mins im gonna have to drink
    if(isConnected){
        console.log("you are connected to mongodb ahah")
        return;
    }

    const mongoDBURI = process.env.MONGODB_URI; //we will be getting the file .env

    if(!mongoDBURI){
        console.error("mongodb connection is nnot defined sory HAHAH")
    }

    try {
        await mongoose.connect(mongoDBURI || '') //i'm using this '' to avoid errors
        isConnected = true;
        console.log("you are connected HAHAH")
        
    } catch (error) {
        console.error("sorry there's an error ;(", error)
    }
}

export default connectMongoDB;