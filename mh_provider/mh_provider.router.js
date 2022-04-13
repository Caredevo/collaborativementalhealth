
const router = require('express').Router();
let Provider = require('./mh_provider.model');
let security = require('./security');

//Provider list GET and ADD
router.route('/').get((req, res) => {
    // const cipherKey = req.query.key;
    Provider.find()
    .then(data => {
        // var encryptedRespond = security.encryption(data, cipherKey);
        // res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Provider.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
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
    const practitioner = payload.data.practitioner;
    const role = payload.data.role;
    const contact = payload.data.contact;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

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

router.route('/').delete((req, res) => {
    Provider.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    var form = req.body;
    const payload = security.decryption(form);

    Provider.findById(payload.data._id)
        .then(provider => {
            provider.patientId = payload.data.patientId;
            provider.practitioner = payload.data.practitioner;
            provider.role = payload.data.role;
            provider.contact = payload.data.contact;
            provider.meta[0].practiceID = payload.data.practiceID;
            provider.meta[0].externalID = payload.data.externalID;
            provider.meta[0].provider = payload.data.provider;


        provider.save()
            .then(() => res.json('Provider updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;