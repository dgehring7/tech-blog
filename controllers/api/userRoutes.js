const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
    console.log('signed up');
        console.log("got a post");
        console.log('req.body.name', req.body);
      const userData = await User.create ({
          name: req.body.username, 
          password: req.body.password,
          email: req.body.email
        });
        console.log(userData);
      req.session.save(() => {
        req.session.id = userData.id;
        req.session.logged_in = true;
        req.session.name = userData.name
  
        res.json(userData);
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  router.post('/login', async (req, res) => {
    try {
        console.log('logged in');
        const validName = await User.findOne({where: {email: req.body.email}});
        // console.log('user',validUsername);
        if (!validName) {
            res.status(400).json({ message: 'Password or Username is incorrect, please try again'});
            return;
        }
        console.log('req.body.password', req.body.password);
        
        const validPassword = await validName.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Password or Username is incorrect, please try again'});
            return;
        };
        
        req.session.save(() => {
        req.session.user_id = validname.id;
        req.session.logged_in = true;
        req.session.userame = validname.name
        
        console.log(req.session);
        res.json({ user: validName.name, message: `Welcome ${validName.name}`})
    });

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
        res.status(400).end();
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;