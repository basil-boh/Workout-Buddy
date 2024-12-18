require('dotenv').config();
// Obtaining packges
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

//Middleware
app.use(express.json()); // Looks if data is being sent to the server 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes - request & response 
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on Port 4000')
        })
    })
    .catch((error) =>{
        console.log(error)
    })



