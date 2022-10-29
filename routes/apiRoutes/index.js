const router = require('express').Router();
const noteRoute = require('./noteRoutes');

router.use(noteRoute);

module.exports = router;