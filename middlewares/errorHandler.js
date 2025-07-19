module.exports = (err, req, res, next) => {
    console.log(err.stack)
    return res.status(500).json({error_message: err.message})
}
