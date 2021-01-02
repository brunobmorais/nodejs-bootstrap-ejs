const bcrypt= require('bcryptjs');
const usersModel = require("../models/users.model");
const tokenLib = require("../lib/token.lib")


module.exports = {

    contact: (req, res) => {
        res.render('pages/index', {
            page: 'contact/index',
            params: {
                title: 'Contact',
                navbar: {
                    menu: {
                        contact: true
                    }
                }
            }
        });
    }
}
