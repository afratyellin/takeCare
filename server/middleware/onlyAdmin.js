const onlyAdmin = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).send({ err: "you need to log in" })
    }
    if (req.session.user.role != 'admin') {
        console.log(req.session.role)
        return res.status(401).send({ err: "only for admin!" })
    }
    next()
}

module.exports = onlyAdmin