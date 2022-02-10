const router = require('express').Router();
let Formulation = require('./mh_formulate.model');

//Formulation list GET and ADD
    router.route('/').get((req, res) => {
    Formulation.find()
        .then(formulation => res.json(formulation))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {
        Formulation.find({ patientId: { $eq: req.params.id } })
            .then(formulation => res.json(formulation))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
    const patientId = req.body.patientId;
    const date = req.body.date;
    const predisposing = req.body.predisposing;
    const precipitating = req.body.precipitating;
    const perpetuating = req.body.perpetuating;
    const protective = req.body.protective;
    const practiceID = req.body.practiceID;
    const externalID = req.body.externalID;
    const provider = req.body.provider;


// SECTION B
    const newFormulation = new Formulation({
        patientId,
        date,
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

//GET, DELETE and UPDATE specific patient
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

    router.route('/:id').delete((req, res) => {
        Formulation.findByIdAndDelete(req.params.id)
            .then(() => res.json('Formulation deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Formulation.findById(req.params.id)
            .then(formulation => {

// SECTION C
                formulation.patientId = req.body.patientId;
                formulation.date = req.body.date;
                formulation.predisposing = req.body.predisposing;
                formulation.precipitating = req.body.precipitating;
                formulation.perpetuating = req.body.perpetuating;
                formulation.protective = req.body.protective;
                formulation.meta[0].practiceID = req.body.practiceID;
                formulation.meta[0].externalID = req.body.externalID;
                formulation.meta[0].provider = req.body.provider;
                

            formulation.save()
                .then(() => res.json('Formulation updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;