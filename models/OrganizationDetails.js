const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    OrganizationName : {
        type : String,
        required : true
    },
    OrganizationEmail : {
        type : String,
        required : true
    },
    OrganizationNumber : {
        type : Number,
        required : true
    },
    OrganizationAddress : {
        type : String,
    },
    NumberOfUser : {
        type : number
    },
    logo : {
        data : Buffer,
        contentType : String
    },
    Location : []
})
module.exports = OrganizationSchema = mongoose.model("OrganizationDetails",OrganizationSchema)