const bcrypt = require('bcrypt');

const { User } = require('../app/models');

async function register(req, res) {
    try {
        let sql = await User.findAll({
            where: {
                email: req.body.email
            }
        });
    
        if(sql.length > 0) {
            res.send(JSON.stringify({"status": 302, "error": 'The email is already in use!'}));
            return;
        }

        req.body.password = await bcrypt.hash (req.body.password, 12);
        console.log('password: ', req.body.password);
        let data = {name: req.body.name, email: req.body.email, password: req.body.password};

        let user = await User.create(data);

        res.send(JSON.stringify({"status": 201, "error": null, "response": user}));
    } catch (error) {
        console.log(error)
        res.send(JSON.stringify({"status": 302, "error": error}));
    }
}

module.exports = {
    register
}