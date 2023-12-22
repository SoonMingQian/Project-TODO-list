const express = require('express')
const app = express()
app.use(express.json())
const port = 4000

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    // Configuring CORS headers to allow requests from any origin and methods
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const mongoose = require('mongoose');

// Connecting to MongoDB using mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://qian:qian8082@cluster0.mbl5ukq.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Schema and model for user signup details
const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const signupModel = mongoose.model('signup', signupSchema);

// Endpoint for user login
app.post("/login", async(req, res) => {
    const {email, password} = req.body;
    signupModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("Incorrect Password")
            }
        }else{
            res.json("No Account Existed")
        }
    })
})

// Endpoint for user signup
app.post("/signup", async(req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await signupModel.findOne({ email: req.body.email });
    
        if (existingUser) {
          // If the email already exists, send a response indicating that the email is already in use
          res.json("Used")
          return res.status(400).json({ message: 'Email is already in use. Please use a different email.' });
        }
    
        // If the email does not exist, create a new user
        const newUser = await signupModel.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        res.json("Created")
    
      } catch (err) {
        // Handle any other errors that might occur during the process
        console.error(err);
     
      }
})


// Schema and model for TO-DO list details
const listSchema = new mongoose.Schema({
    title:String,
    description:String,
    datetime: Date
})

const listModel = mongoose.model('addlist', listSchema);

// Schema and model for TO-DO list details
app.post('/addlist', (req, res) => {
    console.log(req.body);
    listModel.create({
        title:req.body.title,
        description:req.body.description,
        datetime:req.body.datetime
    })
    .then(() => res.json("Successfully"))
    .catch(() => res.json("Error"))
})

// Endpoint for updating an existing TO-DO list
app.put('/addlist/:id', async(req, res) => {
    console.log("Update: " + req.params.id);
    let lists = await listModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(lists);
})

// Endpoint for retrieving a specific TO-DO list by ID
app.get('/addlist/:id', async(req, res) => {
    console.log(req.params.id)
    let lists = await listModel.findById({_id:req.params.id})
    res.send(lists)
})

// Endpoint for retrieving all TO-DO lists
app.get('/addlist', async (req, res) => {
    let lists = await listModel.find({})
    res.json(lists)
})


// Endpoint for deleting a TO-DO list by ID
app.delete('/addlist/:id', async(req, res) => {
    console.log("Delete: " + req.params.id)
    let lists = await listModel.findByIdAndDelete({_id:req.params.id})
    res.send(lists)
})

// Endpoint for searching TO-DO lists by title
app.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.title.toLowerCase();

        // Use Mongoose to search for documents that match the title
        const searchResults = await listModel.find({
            title: { $regex: new RegExp(searchQuery), $options: 'i' }
        });

        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
