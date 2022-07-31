
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

//change below for local production
const port = process.env.PORT || 5100;

//middleware
    app.use(cors({ credentials: true, origin: [ 
        process.env.FRONT_END_URL, 
        process.env.FRONT_END_AWS, 
        process.env.FRONT_END_DOMAIN,
        process.env.FRAME
     ] }));
    app.use(express.json());

//connecting to database : MongoDB
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Routers
    const mh_actionRouter = require('./routes/mh_action.router');
    const mh_formulateRouter = require('./routes/mh_formulate.router');
    const mh_profileRouter = require('./routes/mh_profile.router');
    const mh_providerRouter = require('./routes/mh_provider.router');
    const mh_reviewRouter = require('./routes/mh_review.router');
    const mh_safetyRouter = require('./routes/mh_safety.router');

    app.use('/api/mentalhealth/action', mh_actionRouter);
    app.use('/api/mentalhealth/formulate', mh_formulateRouter);
    app.use('/api/mentalhealth/profile', mh_profileRouter);
    app.use('/api/mentalhealth/provider', mh_providerRouter);
    app.use('/api/mentalhealth/review', mh_reviewRouter);
    app.use('/api/mentalhealth/safety', mh_safetyRouter);

//set up port to listen
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });

