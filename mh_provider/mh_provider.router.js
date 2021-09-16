// change provider, and Provider to intended model
// change the fields in section A, B and C



const router = require('express').Router();
let Provider = require('./mh_provider.model');

//Provider list GET and ADD
    router.route('/').get((req, res) => {
    Provider.find()
        .then(provider => res.json(provider))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/patient/:id').get((req, res) => {
        Provider.find({ patientId: { $eq: req.params.id } })
            .then(provider => res.json(provider))
            .catch(err => res.status(400).json('Error: ' + err));
        });
    
// SECTION A
    router.route('/add').post((req, res) => {
    const patientId = req.body.patientId;
    const practitioner = req.body.practitioner;
    const role = req.body.role;
    const contact = req.body.contact;
    const practiceID = req.body.practiceID;
    const externalID = req.body.externalID;
    const provider = req.body.provider;


// SECTION B
    const newProvider = new Provider({
        patientId,
        practitioner,
        role,
        contact,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newProvider.save()
    .then(() => res.json('Provider added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

//GET, DELETE and UPDATE specific patient
    router.route('/:id').get((req, res) => {
        Provider.findById(req.params.id)
        .then(provider => res.json(provider))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/all').delete((req, res) => {
        Provider.deleteMany(req.params.id)
        .then(() => res.json("All Provider Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Provider.findByIdAndDelete(req.params.id)
            .then(() => res.json('Provider deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
        });

    router.route('/update/:id').post((req, res) => {
        Provider.findById(req.params.id)
            .then(provider => {

// SECTION C
                provider.patientId = req.body.patientId;
                provider.practitioner = req.body.practitioner;
                provider.role = req.body.role;
                provider.contact = req.body.contact;
                provider.meta[0].practiceID = req.body.practiceID;
                provider.meta[0].externalID = req.body.externalID;
                provider.meta[0].provider = req.body.provider;
   

            provider.save()
                .then(() => res.json('Provider updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });

module.exports = router;