module.exports = function (req, res, next) {
    next();
    console.log('statusCode', res.statusCode);
}