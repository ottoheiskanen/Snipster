const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Model = mongoose.model

const imageSchema = new Schema({
    snip: {
        //type: Buffer,
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        expires: '60m', 
        default: Date.now
    }
})

/*
imageSchema.methods.toJSON = function() {
    const snip = this
    const snipObject = snip.toObject()

    delete snipObject.snip

    return snipObject
}
*/


const Snip = Model('Snip', imageSchema) 

module.exports = Snip