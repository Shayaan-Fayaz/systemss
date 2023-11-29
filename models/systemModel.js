const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    manufacturer:{
        type: String
    },
    model: {
        type: String
    },
    serial: {
        type: String
    },
    cpuManufacturer: {
        type: String
    },
    cpuBrand: {
        type: String
    },
    cpu_physicalCore: {
        type: String
    },
    cpu_logicalCore:{
        type: String
    },
    changed:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});


systemSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: '-__v -email -password'
    });

    next();
});

const System = mongoose.model('System', systemSchema);

module.exports = System;