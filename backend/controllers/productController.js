const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')
const User = require('../models/userModels')

// @desc Get products
// @route GET /api/store
// @ access Private
// when we use mongoose to interact with the database we get a promise, so we use async await. we need to install an npm package called express-async-handler
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id })

    res.status(200).json(products)
})


// @desc Set product
// @route SET /api/store
// @ access Private
const setProducts = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const product = await Product.create({
        name: req.body.name,
        description: {
            summary: req.body.summary,
            highlights: req.body.highlights,
            details: req.body.details,
        },
        size: req.body.size,
        color: req.body.color,
        prize: req.body.prize,
        quantity: req.body.quantity,
        user: req.user.id,
    })

    res.status(200).json(product)
})


// @desc Update product
// @route PUT /api/store/:id
// @ access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the product user
    if (product.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedProduct)
})


// @desc Delete product
// @route DELETE /api/store/:id
// @ access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the product user
    if (product.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await product.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct,
}

