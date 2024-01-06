import mongoose from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
    console.log("Inside ensure db")
    if (alreadyDone) {
        return;
    }
    alreadyDone = true;
    await mongoose.connect(process.env.MONGODB_URL! , {  dbName: "courses" });
    console.log("Db Connection Done")
}
