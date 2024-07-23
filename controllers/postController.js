const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author_id: req.user.id });
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author_id', 'username');
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author_id', 'username');
    if (!post) return res.status(404).send({ message: 'Post not found' });
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content, updated_at: Date.now() }, { new: true });
    if (!post) return res.status(404).send({ message: 'Post not found' });
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found' });
    res.send({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};
