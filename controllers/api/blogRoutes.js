const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// blogpost
router.post('/blogs/createBlog', (req, res) => {
  console.log('it works!');
  res.render('createBlog', {title: 'Create a new Blog'});
});

router.get("/blogs", async (req, res) => {
  try {
    const blogData = await Blog.findAll()
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    res.status(200).json(blogs);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/blogs', withAuth, async (req, res) => {
  console.log('Heres a blog');
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/blogs/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.put('/blogs/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.update( 
        {
          name: req.body.name,
          description: req.body.description,
          blog_post: req.body.blog_post,
        },
        {
        where: {
          id: req.params.id
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;