const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const safetySchema = new Schema({
    patientId: { type : String, required: false },
    date : {  type : Date, default: Date.now },
    reason : { type: String, required: false},
    cando : { type: String, required: false},
    help :{ type: String, required: false},
    call : { type: String, required: false},
    talk : { type: String, required: false},
    professional : { type: String, required: false},
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Safety = mongoose.model('Safety', safetySchema);

module.exports = Safety;