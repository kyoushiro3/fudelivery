import mongoose, { Schema } from "mongoose";

export interface IUser{
    name: string,
    email: string,
    password: string,
    role: string,
}

const UserSchema = new Schema<IUser>({ 
    name: {type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required:true},
    role:{type:String, enum:["admin", "customer"], default:"customer", required:true}
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);