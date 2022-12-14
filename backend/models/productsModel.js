const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a text value']
    },
    description: {
        summary: { type: String },
        highlights: { type: String },
        details: { type: String },
    },
    size: { type: String },
    color: { type: String },
    prize: { type: String },
    quantity: { type: String },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', productSchema)