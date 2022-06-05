const router = require('express').Router();
let Action = require('../models/mh_action.model');
let security = require('../security');

router.route('/test').get((req, res) => {
    res.json("Testing backend");
});

router.route('/').get((req, res) => {
    const cipherKey = req.query.key;
    Action.find()
    .then(data => {
        var encryptedRespond = security.encryption(data, cipherKey);
        res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//API GET by PatientId
router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Action.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
    .then(data => {
        var encryptedRespond = security.encryption(data, cipherKey);
        res.json(encryptedRespond)
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});
    
//API ADD
router.route('/add').post((req, res) => {

    var form = req.body;
    const payload = security.decryption(form);
    
    const patientId = payload.data.patientId;
    const issue = payload.data.issue;
    const goal = payload.data.goal;
    const intervention = payload.data.intervention;
    const referral = payload.data.referral;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

    const newAction = new Action({
        patientId,
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

router.route('/').delete((req, res) => {
    Action.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    var form = req.body;
    const payload = security.decryption(form);

    Action.findById(payload.data._id)
        .then(action => {
            action.patientId = payload.data.patientId;
            action.date = payload.data.date;
            action.issue = payload.data.issue;
            action.goal = payload.data.goal;
            action.intervention = payload.data.intervention;
            action.referral = payload.data.referral;
            action.meta[0].practiceID = payload.data.practiceID;
            action.meta[0].externalID = payload.data.externalID;
            action.meta[0].provider = payload.data.provider;


        action.save()
            .then(() => res.json('Action updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;