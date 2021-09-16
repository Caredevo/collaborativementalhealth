
const router = require('express').Router();
let Safety = require('./mh_safety.model');

//Safety list GET and ADD
    router.route('/').get((req, res) => {
    Safety.find()
        .then(safety => res.json(safety))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {
        Safety.find({ patientId: { $eq: req.params.id } })
            .then(safety => res.json(safety))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
        const patientId = req.body.patientId;
        const date = req.body.date;
        const reason = req.body.reason;
        const cando = req.body.cando;
        const help = req.body.help;
        const call = req.body.call;
        const talk  = req.body.talk;
        const professional = req.body.professional;
        const practiceID = req.body.practiceID;
        const externalID = req.body.externalID;
        const provider = req.body.provider;


// SECTION B
    const newSafety = new Safety({
        patientId,
        date,
        reason,
        cando,
        help,
        call,
        talk,
        professional,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newSafety.save()
    .then(() => res.json('Safety added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

//GET, DELETE and UPDATE specific patient
    router.route('/:id').get((req, res) => {
        Safety.findById(req.params.id)
        .then(safety => res.json(safety))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/all').delete((req, res) => {
        Safety.deleteMany(req.params.id)
        .then(() => res.json("All Safety Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Safety.findByIdAndDelete(req.params.id)
            .then(() => res.json('Safety deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Safety.findById(req.params.id)
            .then(safety => {

// SECTION C
                safety.patientId = req.body.patientId;
                safety.date = req.body.date;
                safety.reason = req.body.reason;
                safety.cando = req.body.cando;
                safety.help = req.body.help;
                safety.call = req.body.call;
                safety.talk  = req.body.talk;
                safety.professional = req.body.professional;
                safety.meta[0].practiceID = req.body.practiceID;
                safety.meta[0].externalID = req.body.externalID;
                safety.meta[0].provider = req.body.provider;

            safety.save()
                .then(() => res.json('Safety updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;