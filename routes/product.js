const express = require('express')
const router = express.Router()
const {getAllProducts, getAllProductsTest} = require("../controllers/product")

router.route('/')
    .get(getAllProducts)

router.route('/test')
    .get(getAllProductsTest)
    
module.exports = router