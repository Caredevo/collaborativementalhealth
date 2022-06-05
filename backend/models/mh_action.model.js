const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
    patientId: { type : String, required: false },
    date : {  type : Date, default: Date.now },
    issue : {  type : String, required: false },
    goal : { type : String, required: false },
    intervention :{ type : String, required: false },
    referral : { type : String, required: false },
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;