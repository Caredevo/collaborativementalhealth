// change action, and Action to intended model
// change the fields in section A, B and C



const router = require('express').Router();
let Action = require('./mh_action.model');

//Action list GET and ADD
    router.route('/').get((req, res) => {
    Action.find()
        .then(action => res.json(action))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {
        Action.find({ patientId: { $eq: req.params.id } })
            .then(action => res.json(action))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
    const patientId = req.body.patientId;
    const date = req.body.date;
    const issue = req.body.issue;
    const goal = req.body.goal;
    const intervention = req.body.intervention;
    const referral = req.body.referral;
    const practiceID = req.body.practiceID;
    const externalID = req.body.externalID;
    const provider = req.body.provider;

// SECTION B
    const newAction = new Action({
        patientId,
        date,
        issue,
        goal,
        intervention,
        referral,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newAction.save()
    .then(() => res.json('Action added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

//GET, DELETE and UPDATE specific patient
    router.route('/:id').get((req, res) => {
        Action.findById(req.params.id)
        .then(action => res.json(action))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/all').delete((req, res) => {
        Action.deleteMany(req.params.id)
        .then(() => res.json("All Action Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Action.findByIdAndDelete(req.params.id)
            .then(() => res.json('Action deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Action.findById(req.params.id)
            .then(action => {

// SECTION C
                action.patientId = req.body.patientId;
                action.date = req.body.date;
                action.issue = req.body.issue;
                action.goal = req.body.goal;
                action.intervention = req.body.intervention;
                action.referral = req.body.referral;
                action.meta[0].practiceID = req.body.practiceID;
                action.meta[0].externalID = req.body.externalID;
                action.meta[0].provider = req.body.provider;


            action.save()
                .then(() => res.json('Action updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;