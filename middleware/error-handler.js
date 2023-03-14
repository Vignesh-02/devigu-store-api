const errorHandlerMiddleWare = async(err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ msg: 'Oops, something went wrong. Please try again' })
}

module.exports = errorHandlerMiddleWare
