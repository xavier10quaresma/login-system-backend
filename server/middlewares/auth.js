const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    
    // Get Token
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.json({ error: 'A token is required for Authentication' })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded

    } catch (err) {
        return res.json({ error: 'Invalid Token' })
    }

    return next()

}

module.exports = verifyToken
