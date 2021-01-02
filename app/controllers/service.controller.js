const bcrypt= require('bcryptjs');
const usersModel = require("../models/users.model");
const tokenLib = require("../lib/token.lib")


module.exports = {

    service: (req, res) => {
        res.render('pages/index', {
            page: 'service/index',
            params: {
                title: 'Service',
                navbar: {
                    menu: {
                        service: true
                    }
                }},
        });
    }
}