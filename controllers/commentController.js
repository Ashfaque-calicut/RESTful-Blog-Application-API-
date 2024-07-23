const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const comment = new Comment({ post_id, content, author_id: req.user.id });
    await comment.save();
    res.status(201).send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.query.post_id }).populate('author_id', 'username');
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('author_id', 'username');
    if (!comment) return res.status(404).send({ message: 'Comment not found' });
    res.send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, { content, updated_at: Date.now() }, { new: true });
    if (!comment) return res.status(404).send({ message: 'Comment not found' });
    res.send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).send({ message: 'Comment not found' });
    res.send({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};
