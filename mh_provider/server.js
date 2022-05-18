
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

//change below for local production
const port = process.env.PORT || 5040;

//middleware
    app.use(cors({ credentials: true, origin: process.env.FRONT_END_URI }));
    app.use(express.json());
 
//connecting to database : MongoDB
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );


// Routers
    
    const mh_providerRouter = require('./mh_provider.router');

    app.use('/mh_provider', mh_providerRouter);

//set up port to listen
   
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });

