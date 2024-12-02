const onlyProfessional = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).send({ err: "you need to log in" })
    }
    if (req.session.user.role != 'professional') {
        return res.status(401).send({ err: "only for Professional" })
    }
    next()
}

module.exports = onlyProfessional