const express = require('express');
const app = express();
const router = express.Router();

const homeController = require("../controllers/home.controller");
const aboutController = require("../controllers/about.controller");
const contactController = require("../controllers/contact.controller");
const serviceController = require("../controllers/service.controller");

// ROUTES
router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/about', aboutController.about);
router.get('/service', serviceController.service);
router.get('/contact', contactController.contact);

module.exports = router;

