const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    patientId: { type : String, required: false },
    date : {  type : Date, default: Date.now },
    mentalhx: { type : String, required: false },
    personality : { type : String, required: false },
    familyhx : { type : String, required: false },
    socialhx :{ type : String, required: false },
    develophx : { type : String, required: false },
    domestic : { type : String, required: false },
    substance : { type : String, required: false },
    treatmenthx : { type : String, required: false },
    housing : { type : String, required: false },
    finance : { type : String, required: false },
    employment : { type : String, required: false },
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;