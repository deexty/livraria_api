import mongoose from "mongoose"

mongoose.connect('mongodb://ec2-54-196-211-114.compute-1.amazonaws.com:27017/livraria');

let db = mongoose.connection;

export default db;