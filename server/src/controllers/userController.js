const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

require('dotenv').config();
const SECRET = process.env.SECRET;

const { User } = require('../app/models');
const { validateEmail } = require('../utils/utils');

async function register(req, res) {
    try {
        // verifies parameters
        if(!req.body.name || !req.body.email || !req.body.password) {
            res.status(400).send(JSON.stringify({"status": 400, "error": 'Missing parameters'}));
            return;
        }

        // verifies email
        if(!validateEmail(req.body.email)) {
            res.status(400).send(JSON.stringify({"status": 400, "error": 'Invalid email'}));
            return;
        }

        let sql = await User.findAll({
            where: {
                email: req.body.email
            }
        });
    
        // if theres no user with that email, returns error
        if(sql.length > 0) {
            res.status(500).send(JSON.stringify({"status": 500, "error": 'The email is already in use!'}));
            return;
        }

        req.body.password = await bcrypt.hash (req.body.password, 12);

        let data = {name: req.body.name, email: req.body.email, password: req.body.password};

        let user = await User.create(data);

        res.send(JSON.stringify({"status": 201, "response": user}));
    } catch (error) {
        console.log(error)
        res.status(500).send(JSON.stringify({"status": 500, "error": error}));
    }
}

async function login(req, res) {
    try {
        // verifies parameters
        if(!req.body.email || !req.body.password) {
            res.status(400).send(JSON.stringify({"status": 400, "error": 'Missing parameters'}));
            return;
        }

        // verifies email
        if(!validateEmail(req.body.email)) {
            res.status(400).send(JSON.stringify({"status": 400, "error": 'Invalid email'}));
            return;
        }

        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        
        // if theres no user with that email, returns error
        if(!user) {
            res.status(404).send(JSON.stringify({"status": 404, "error": 'There is no user with that email!'}));
            return;
        }
    
        // verifies password
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(401).send(JSON.stringify({"status": 401, "error": 'Incorrect password'}));
            return;
        }
    
        const token = jwt.sign ({
            user: lodash.pick(user, ['id', 'email']),
            role: 'admin'
        },
        SECRET,
        {
            expiresIn: '5m',
        });
    
        res.status(200).send(JSON.stringify({"token": token}));
    } catch (error) {
        console.log(error)

        res.status(500).send(JSON.stringify({"status": 500, "error": error}));
    }
}


module.exports = {
    register,
    login
}