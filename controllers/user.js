exports.getMainPage = (req, res, next) => {
    res.render('user/main', {
        pageTitle: 'Main Page'
    })
};