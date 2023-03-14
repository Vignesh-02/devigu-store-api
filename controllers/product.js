const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { featured, company, name, price, rating, sort, fields, numericFilters } = req.query
    
    const search = name
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company){
        queryObject.company = company
    }

    if (price){
        queryObject.price = price
    }

    if (rating){
        queryObject.rating = rating
    }

    if (name){
        queryObject.name = { $regex: search, $options: 'i' }
    }

    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<': '$lt',
            '<=': '$lte'
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g

        let filters = numericFilters.replace(regEx, 
            (match) => `-${operatorMap[match]}-`)
        
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    // Our queryObject looks like this now
    // { price: { '$lt': 50 }, rating: { '$lt': 4 } }
    
    console.log(queryObject)
    // queryObject
    let result = Product.find(queryObject)


    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList) 
    }else {
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    
    res.status(200).json({ products, numOfHits: products.length })
};

const getAllProductsTest = async (req, res) => {
    
    const products = await Product.find({ price: { $gt: 30 }})
        .sort('name')
        .select('name price company')
    // i in options refers to case insensitive
    // name: { $regex: search, $options: 'i' },

    // const prods = await Product.find({})
    //     .sort('name')
    //     .select('name price')
    //     .limit(6)
    //     .skip(2)
    
    res.status(200).json({ products, numOfHits:     res.status(200).json({ products, numOfHits: products.length })
.length })

};

module.exports = {
    getAllProducts,
    getAllProductsTest
};
