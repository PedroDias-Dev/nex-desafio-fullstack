const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const SECRET = 'asbadbbdbbh7788888887hb113h3hbb';

const { User } = require('../app/models');

async function register(req, res) {
    try {
        let sql = await User.findAll({
            where: {
                email: req.body.email
            }
        });
    
        if(sql.length > 0) {
            res.status(401).send(JSON.stringify({"status": 302, "error": 'The email is already in use!'}));
            return;
        }

        req.body.password = await bcrypt.hash (req.body.password, 12);
        console.log('password: ', req.body.password);
        let data = {name: req.body.name, email: req.body.email, password: req.body.password};

        let user = await User.create(data);

        res.send(JSON.stringify({"status": 201, "error": null, "response": user}));
    } catch (error) {
        console.log(error)
        res.status(302).send(JSON.stringify({"status": 302, "error": error}));
    }
}

async function login(req, res) {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
    
        if(user == []) {
            res.status(404).send(JSON.stringify({"status": 302, "error": 'There is no user with that email!'}));
            return;
        }
    
        console.log(user)
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(401).send(JSON.stringify({"status": 404, "error": 'Incorrect password', "token": null}));
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

        res.status(302).send(JSON.stringify({"status": 302, "error": error}));
    }
}


module.exports = {
    register,
    login
}