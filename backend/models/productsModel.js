const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        trquired: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'please add a product name']
    },
    description: {
        summary: { type: String, require: [true, 'please add a product description summary'] },
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
