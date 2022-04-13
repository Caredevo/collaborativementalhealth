
const router = require('express').Router();
let Review = require('./mh_review.model');
let security = require('./security');

router.route('/').get((req, res) => {
    // const cipherKey = req.query.key;
    Review.find()
    .then(data => {
        // var encryptedRespond = security.encryption(data, cipherKey);
        // res.json(encryptedRespond)
        res.json(data);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/patient').get((req, res) => {
    const cipherKey = req.query.key;
    Review.find({ patientId: { $eq: req.query.id } }).sort({date:'descending'})
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
    const date = payload.data.date;
    const review = payload.data.review;
    const mse = payload.data.mse;
    const risk = payload.data.risk;
    const assessment = payload.data.assessment;
    const tools = payload.data.tools;
    const practiceID = payload.data.practiceID;
    const externalID = payload.data.externalID;
    const provider = payload.data.provider;

    const newReview = new Review({
        patientId,
        date,
        review,
        mse,
        risk,
        assessment,
        tools,
        meta : {
            practiceID,
            externalID,
            provider
        }
    });

    newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').delete((req, res) => {
    Review.deleteMany(req.params.id)
    .then(() => res.json("All Review Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Review.findByIdAndDelete(req.query.id)
    .then(() => res.json('Substance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {

    var form = req.body;
    const payload = security.decryption(form);

    Review.findById(payload.data._id)
        .then(review => {
            review.patientId = payload.data.patientId;
            review.date = payload.data.date;
            review.review = payload.data.review;
            review.mse = payload.data.mse;
            review.risk = payload.data.risk;
            review.assessment = payload.data.assessment;
            review.tools = payload.data.tools;
            review.meta[0].practiceID = payload.data.practiceID;
            review.meta[0].externalID = payload.data.externalID;
            review.meta[0].provider = payload.data.provider;

        review.save()
            .then(() => res.json('Review updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;