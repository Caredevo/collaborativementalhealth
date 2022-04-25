
const router = require('express').Router();
let Safety = require('./mh_safety.model');
let security = require('./security');

//Safety list GET and ADD
router.route('/test').get((req, res) => {
    res.json("Testing for MH_Safety running");
});

router.route('/').get((req, res) => {
    // const cipherKey = req.query.key;
    Safety.find()
    .then(data => {
        // var encryptedRespond = security.encryption(data, cipherKey);
        // res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Safety.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
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
    const reason = payload.data.reason;
    const cando = payload.data.cando;
    const help = payload.data.help;
    const call = payload.data.call;
    const talk  = payload.data.talk;
    const professional = payload.data.professional;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

    const newSafety = new Safety({
        patientId,
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

router.route('/').delete((req, res) => {
    Safety.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    var form = req.body;
    const payload = security.decryption(form);

    Safety.findById(payload.data._id)
        .then(safety => {
            safety.patientId = payload.data.patientId;
            safety.date = payload.data.date;
            safety.reason = payload.data.reason;
            safety.cando = payload.data.cando;
            safety.help = payload.data.help;
            safety.call = payload.data.call;
            safety.talk  = payload.data.talk;
            safety.professional = payload.data.professional;
            safety.meta[0].practiceID = payload.data.practiceID;
            safety.meta[0].externalID = payload.data.externalID;
            safety.meta[0].provider = payload.data.provider;

        safety.save()
            .then(() => res.json('Safety updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;