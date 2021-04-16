import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes/authRoutes.js'
import passwordRoutes from './routes/passwordRoutes/passwordRoutes.js'
//dbSchema for user
import User from "./models/dbUser.js"
import Cors from 'cors'

//app config 
const app = express();
app.use(express.json())
app.use(Cors());
const port = process.env.PORT || 8001;
// const connection_url= `mongodb+srv://Yimika:Nigeria2021@projects.i8x1w.mongodb.net/EcommerceProject?retryWrites=true&w=majority`
const connection_url=`mongodb://Yimika:Nigeria2021@projects-shard-00-00.i8x1w.mongodb.net:27017,projects-shard-00-01.i8x1w.mongodb.net:27017,projects-shard-00-02.i8x1w.mongodb.net:27017/EcommerceProject?ssl=true&replicaSet=atlas-lueebu-shard-0&authSource=admin&retryWrites=true&w=majority`
app.use(express.static("public"));
app.use("/auth", authRoutes);
app.use('/pass',passwordRoutes)

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).catch(error => console.log(error));

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB database connected successfully")
});

//APi endpoints
app.get("/",(req,res) =>{
    res.status(200).send("hello there")
})

//Listeners
app.listen(port, ()=> console.log(`listening on local host: ${port}`));