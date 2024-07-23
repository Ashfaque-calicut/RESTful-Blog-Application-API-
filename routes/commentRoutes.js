const express = require('express');
const { createComment, getComments, getComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/comments', authMiddleware, createComment);
router.get('/comments', getComments);
router.get('/comments/:id', getComment);
router.put('/comments/:id', authMiddleware, updateComment);
router.delete('/comments/:id', authMiddleware, deleteComment);

module.exports = router;
