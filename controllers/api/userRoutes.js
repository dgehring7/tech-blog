const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
          name: req.body.username, 
          password: req.body.password});
  
      req.session.save(() => {
        req.session.id = userData.id;
        req.session.logged_in = true;
        req.session.name = userData.username
  
        res.json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
        const validUsername = await User.findOne({where: {name: req.body.username}});
        // console.log('user',validUsername);
        if (!validUsername) {
            res.status(400).json({ message: 'Password or Username is incorrect, please try again'});
            return;
        }
        console.log('req.body.password',req.body.password);
        const validPassword = await validUsername.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Password or Username is incorrect, please try again'});
            return;
        };
        
        req.session.id = validUsername.id;
        req.session.logged_in = true;
        req.session.name = validUsername.name
        
        console.log(req.session);
        res.json({ user: validUsername.name, message: `Welcome ${validUsername.name}`})
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end
    }
});

module.exports = router;