const bcrypt= require('bcryptjs');
const usersModel = require("../models/users.model");
const tokenLib = require("../lib/token.lib")


module.exports = {

    index: (req, res) => {
        res.render('pages/index', {
            page: 'home/index',
            params: {
                title: 'Home',
                navbar: {
                    menu: {
                        home: true
                    }
                } },
        });
    }
}
