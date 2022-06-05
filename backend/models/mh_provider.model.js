const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    patientId: { type : String, required: false },
    practitioner : { type : String, required: false },
    role : { type : String, required: false },
    contact : { type : String, required: false },
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;