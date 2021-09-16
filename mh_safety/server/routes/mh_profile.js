// change profile, and Profile to intended model
// change the fields in section A, B and C



const router = require('express').Router();
let Profile = require('../models/mh_profile.model');

//Profile list GET and ADD
    router.route('/').get((req, res) => {
    Profile.find()
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {
        Profile.find({ patientId: { $eq: req.params.id } })
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
    const patientId = req.body.patientId;
    const date = req.body.date;
    const mentalhx = req.body.mentalhx;
    const personality = req.body.personality;
    const familyhx = req.body.familyhx;
    const socialhx = req.body.socialhx;
    const develophx = req.body.develophx;
    const domestic = req.body.domestic;
    const substance = req.body.substance;
    const treatmenthx = req.body.treatmenthx;
    const housing = req.body.housing;
    const finance = req.body.finance;
    const employment = req.body.employment;
    const practiceID = req.body.meta[0].practiceID;
    const externalID = req.body.meta[0].externalID;
    const provider = req.body.meta[0].provider;


// SECTION B
    const newProfile = new Profile({
        patientId,
        date,
        mentalhx,
        personality,
        familyhx,
        socialhx,
        develophx,
        domestic,
        substance,
        treatmenthx,
        housing,
        finance,
        employment,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newProfile.save()
    .then(() => res.json('Profile added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

//GET, DELETE and UPDATE specific patient
    router.route('/:id').get((req, res) => {
        Profile.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/all').delete((req, res) => {
        Profile.deleteMany(req.params.id)
        .then(() => res.json("All Profile Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Profile.findByIdAndDelete(req.params.id)
            .then(() => res.json('Profile deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Profile.findById(req.params.id)
            .then(profile => {

// SECTION C
                profile.patientId = req.body.patientId;
                profile.date = req.body.date;
                profile.mentalhx = req.body.mentalhx;
                profile.personality = req.body.personality;
                profile.familyhx = req.body.familyhx;
                profile.socialhx = req.body.socialhx;
                profile.develophx = req.body.develophx;
                profile.domestic = req.body.domestic;
                profile.substance = req.body.substance;
                profile.treatmenthx = req.body.treatmenthx;
                profile.housing = req.body.housing;
                profile.finance = req.body.finance;
                profile.employment = req.body.employment;
                profile.meta[0].practiceID = req.body.meta[0].practiceID;
                profile.meta[0].externalID = req.body.meta[0].externalID;
                profile.meta[0].provider = req.body.meta[0].provider;

            profile.save()
                .then(() => res.json('Profile updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;