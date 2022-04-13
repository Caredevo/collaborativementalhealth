const router = require('express').Router();
let Profile = require('./mh_profile.model');
let security = require('./security');

router.route('/').get((req, res) => {
    // const cipherKey = req.query.key;
    Profile.find()
    .then(data => {
        // var encryptedRespond = security.encryption(data, cipherKey);
        // res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Profile.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
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
    const mentalhx = payload.data.mentalhx;
    const personality = payload.data.personality;
    const familyhx = payload.data.familyhx;
    const socialhx = payload.data.socialhx;
    const develophx = payload.data.develophx;
    const domestic = payload.data.domestic;
    const substance = payload.data.substance;
    const treatmenthx = payload.data.treatmenthx;
    const housing = payload.data.housing;
    const finance = payload.data.finance;
    const employment = payload.data.employment;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

    const newProfile = new Profile({
        patientId,
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

router.route('/').delete((req, res) => {
    Profile.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    var form = req.body;
    const payload = security.decryption(form);

    Profile.findById(payload.data._id)
        .then(profile => {
            profile.patientId = payload.data.patientId;
            profile.date = payload.data.date;
            profile.mentalhx = payload.data.mentalhx;
            profile.personality = payload.data.personality;
            profile.familyhx = payload.data.familyhx;
            profile.socialhx = payload.data.socialhx;
            profile.develophx = payload.data.develophx;
            profile.domestic = payload.data.domestic;
            profile.substance = payload.data.substance;
            profile.treatmenthx = payload.data.treatmenthx;
            profile.housing = payload.data.housing;
            profile.finance = payload.data.finance;
            profile.employment = payload.data.employment;
            profile.meta[0].practiceID = payload.data.practiceID;
            profile.meta[0].externalID = payload.data.externalID;
            profile.meta[0].provider = payload.data.provider;

        profile.save()
            .then(() => res.json('Profile updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;