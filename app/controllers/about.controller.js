const bcrypt= require('bcryptjs');
const usersModel = require("../models/users.model");
const tokenLib = require("../lib/token.lib")


module.exports = {

    about: (req, res) => {
        res.render('pages/index', {
            page: 'about/index',
            params: {
                title: 'About',
                navbar: {
                    menu: {
                        about: true
                    }
                } },
        });
    }
}
