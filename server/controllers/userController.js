const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Get Models
const User = require('../models/User')


/**
 * Get All Users
 */
exports.getUsers = async(req, res) => {
    await User.find()
            .then((result) => { res.status(200).json(result) })
            .catch((err) => { res.json({ error: 'Failed in request' }) })
}

/**
 * Get User
 */
exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404).json({ error: 'Without User' })
    }

    res.status(200).json(user)

    // Verify if User exist in Database
               
}

/**
 * Edit User
 */
//  exports.editUser = async(req, res) => {
//     await User.findByIdAndUpdate(req.params.id, { first_name: req.body.first_name,  })
//             .then((result) => { res.status(200).json(result) })
//             .catch((err) => { res.status(500).json({ error: 'Failed in request' }) })
// }


/**
 * Delete User
 */
 exports.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
            .then((result) => { res.status(200).json(result) })
            .catch((err) => { res.status(500).json({ error: 'Failed in request' }) })
}


/**
 * Register a new User
 */
exports.register = async (req, res) => {

    try {
        // Get User Input
        const { first_name, last_name, email, password } = req.body
        
        // Validate User Input
        if (!(email && password && first_name && last_name)) {
            res.json({ error: 'Preencha todos os campos' })
        }

        // Validate If User exist in Database
        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.json({ error: 'Usuário existente. Por favor faça o Login' })
        }

        // Encrypt User Password
        encryptedPassword = await bcrypt.hash(password, 10)

        // Create User in Database
        const user = await User.create({ 
            first_name, 
            last_name, 
            email: email.toLowerCase(), 
            password: encryptedPassword 
        })

        // Create Token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        )

        // Save User Token
        user.token = token

        // Return New User
        res.status(201).json(user)

    } catch(err) {
        console.log(err)
    }

}

/**
 *  Login
 */
exports.login = async (req, res) => {
    
    try {
        // Get User Input
        const { email, password } = req.body

        // Validate User Input
        if (!(email && password)) {
            res.json({ error: 'Preencha todos os campos' })
        }

        // Validate if User exist in Database
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create Token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: '2h' }
            )

            // Save User token
            user.token = token

            // Return User
            res.status(200).json(user)
        }

        // Invalid Email or Passord
        res.json({ error: 'Dados Inválidos' })

    } catch(err) {
        console.log(err)
    }

}