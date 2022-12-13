const asyncHandler = require('express-async-handler')
// @desc Get goals
// @route GET /api/goals
// @ access Private
// when we use mongoose to interact with the database we get a promise, so we use async await. we need to install an npm package called express-async-handler
const getProducts = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get products' })
})


// @desc Set goals
// @route SET /api/goals
// @ access Private
const setProducts = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new error('Please add a text field')
    }

    res.status(200).json({ message: 'Set products' })
})


// @desc Update goals
// @route PUT /api/goals/:id
// @ access Private
const updateProduct = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Update products ${req.params.id}` })
})


// @desc Delete goals
// @route DELETE /api/goals/:id
// @ access Private
const deleteProduct = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Delete products ${req.params.id}` })
})


module.exports = {
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct,
}