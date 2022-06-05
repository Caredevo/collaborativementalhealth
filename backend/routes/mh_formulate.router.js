const router = require('express').Router();
let Formulation = require('../models/mh_formulate.model');
let security = require('../security');

router.route('/test').get((req, res) => {
    res.json("Testing backend");
});

router.route('/').get((req, res) => {
    // const cipherKey = req.query.key;
    Formulation.find()
    .then(data => {
        // var encryptedRespond = security.encryption(data, cipherKey);
        // res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Formulation.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
    .then(data => {
        var encryptedRespond = security.encryption(data, cipherKey);
        res.json(encryptedRespond)
    })
    .catch(err => res.status(400).json('Error: ' + err));
    
});
    
router.route('/add').post((req, res) => {

    var form = req.body;
    const payload = security.decryption(form);
    
    const patientId = payload.data.patientId;
    const predisposing = payload.data.predisposing;
    const precipitating = payload.data.precipitating;
    const perpetuating = payload.data.perpetuating;
    const protective = payload.data.protective;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

    const newFormulation = new Formulation({
        patientId,
        predisposing,
        precipitating,
        perpetuating,
        protective,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newFormulation.save()
    .then(() => res.json('Formulation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Formulation.findById(req.params.id)
    .then(formulation => res.json(formulation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').delete((req, res) => {
    Formulation.deleteMany(req.params.id)
    .then(() => res.json("All Formulation Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Formulation.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    var form = req.body;
    const payload = security.decryption(form);

    Formulation.findById(payload.data._id)
        .then(formulation => {
            formulation.patientId = payload.data.patientId;
            formulation.date = payload.data.date;
            formulation.predisposing = payload.data.predisposing;
            formulation.precipitating = payload.data.precipitating;
            formulation.perpetuating = payload.data.perpetuating;
            formulation.protective = payload.data.protective;
            formulation.meta[0].practiceID = payload.data.practiceID;
            formulation.meta[0].externalID = payload.data.externalID;
            formulation.meta[0].provider = payload.data.provider;
            
        formulation.save()
            .then(() => res.json('Formulation updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;