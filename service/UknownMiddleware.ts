module.exports = function (req, res, next) {
    if (req.path == '/brak') {
        res.redirect('/');
    } else {
        next();
    }
}