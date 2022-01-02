
const router = require('express').Router();
let Review = require('./mh_review.model');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET;
const jwtExpirySeconds = 300;

//Review list GET and ADD
    router.route('/').get((req, res) => {
    Review.find()
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {


        
        const token = req.cookies.token;
        const sessionId = req.cookies['connect.sid'];

        //check session
        if(!sessionId) {
            return res.status(401).end()
        }
   
        if (!token) {
            return res.status(401).end()
        }

        var payload, dataPayload;
        try {
            payload = jwt.verify(token, jwtKey);
            dataPayload = JSON.stringify(payload.tokenPayload);
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }
            return res.status(400).end()
        }

        console.log(dataPayload);

        //check the mental healh permission here. 
        //if no permitted -> res.json([data, permission])
        // problem permission is empty
        Review.find({ patientId: { $eq: req.params.id } })
            .then(review => res.json(review))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
    const patientId = req.body.patientId;
    const date = req.body.date;
    const review = req.body.review;
    const mse = req.body.mse;
    const risk = req.body.risk;
    const assessment = req.body.assessment;
    const tools = req.body.tools;
    const practiceID = req.body.practiceID;
    const externalID = req.body.externalID;
    const provider = req.body.provider;

// SECTION B
    const newReview = new Review({
        patientId,
        date,
        review,
        mse,
        risk,
        assessment,
        tools,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

//GET, DELETE and UPDATE specific patient
    router.route('/:id').get((req, res) => {
        Review.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/all').delete((req, res) => {
        Review.deleteMany(req.params.id)
        .then(() => res.json("All Review Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Review.findByIdAndDelete(req.params.id)
            .then(() => res.json('Review deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Review.findById(req.params.id)
            .then(review => {

// SECTION C
                review.patientId = req.body.patientId;
                review.date = req.body.date;
                review.review = req.body.review;
                review.mse = req.body.mse;
                review.risk = req.body.risk;
                review.assessment = req.body.assessment;
                review.tools = req.body.tools;
                review.meta[0].practiceID = req.body.practiceID;
                review.meta[0].externalID = req.body.externalID;
                review.meta[0].provider = req.body.provider;

            review.save()
                .then(() => res.json('Review updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;