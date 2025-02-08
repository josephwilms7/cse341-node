const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/teams', require('./teams'));
router.use('/games', require('./games'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if(err) { return next(err) }
    res.redirect('/');
  });
});
module.exports = router;