const express =require('express');
const { protect } = require('../middleware/authMiddleware');
const{ getNote, createNote, updateNote, deleteNote, getNoteById} = require ('../controllers/noteController');
const router= express.Router();
router.route('/')
  .get(protect,getNote)
  .post(protect,createNote)
  
  router.route('/:id') 
 .put(protect,updateNote)
  .delete(protect,deleteNote)
  .get(protect,getNoteById)
  module.exports = router;