const asyncHandler = require('express-async-handler')

const Product = require('../models/productsModel')
// @desc Get goals
// @route GET /api/goals
// @ access Private
// when we use mongoose to interact with the database we get a promise, so we use async await. we need to install an npm package called express-async-handler
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()

    res.status(200).json(products)
})


// @desc Set goals
// @route SET /api/goals
// @ access Private
const setProducts = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const product = await Product.create({
        name: req.body.text,
        description: {
            summary: req.body.text,
            hilights: req.body.text,
            details: req.body.text,
        },
        size: req.body.text,
        color: req.body.text,
        prize: req.body.text,
        quantity: req.body.text
    })

    res.status(200).json(product)
})


// @desc Update goals
// @route PUT /api/goals/:id
// @ access Private
const updateProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update products ${req.params.id}` })
})


// @desc Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteProduct = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete products ${req.params.id}` })
})


module.exports = {
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct,
}