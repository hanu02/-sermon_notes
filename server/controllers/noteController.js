const Note = require('../models/Notes');
//create
const createNote = async(req,res,next) => {
    try{
        const { title, scriptureReferencing,content } = req.body
   const note = await Note.create({
    user:req.user._id,
    title,scriptureReferencing,content,
   });
   res.status(201).json(note)
}
catch(error){
    next(error)
};
}
//get
const getNote =async(req,res,next) => {
    try{
        

        const get = await Note.find({user: req.user._id}).sort({createdAt: -1}); 
        res.json(get)

    }
    catch(error){
        next(error)
    }
};
//update
const updateNote = async(req,res,next) =>{
    try{
        const update = await Note.findById(req.params.id)
        
        if(!update){
          res.status(404) 
         throw new Error('note not found')
        }
        //ownership check 
        if (update.user.toString() !== req.user._id.toString()){
             res.status(403)
        throw new Error('not authorized to edit this note ')
        }
        update.title = req.body.title || update.title;
         update.scriptureReferencing = req.body.scriptureReferencing || update.scriptureReferencing;
         update.content = req.body.content || update.content 
         const saveUpdated =await update.save();
         res.json(saveUpdated)
    }
    catch(error){
        next(error);
    }
};
//delete
const deleteNote = async(req,res,next) =>
    {
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            res.status(404)
            throw new Error('note not found')
        }
        //ownershp check 
        if (note.user.toString() !== req.user._id.toString()){
   res.status(403)
        throw new Error('not authorized to  this note ')
                     }
        const deletedsave = await note.deleteOne();
        res.json({ message: 'Note removed' });
        }
        catch(error){
 next(error)
    }
}
const getNoteById = async (req, res, next) => {
  try {
    // 1. find the note by the ID in the URL
    const note =  await Note.findById(req.params.id)
    // 2. if it doesn't exist: status 404, and throw an error
    if(!note){
        res.status(404)
        throw new Error('not found')
    }
    // 3. if it belongs to someone else: status 403, and throw an error
    if (note.user.toString() !== req.user._id.toString()){
   res.status(403)
        throw new Error('not authorized to  this note ')
  
    
  }
    // 4. send the note back 
  res.json(note);
}
   catch (error) {
    next(error);
  }
};
    module.exports = { getNote, createNote, updateNote, deleteNote ,getNoteById};
    
    
       
    
