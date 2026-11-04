const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required:true,
    },
    content:{
        type : String,
        required: true,

    },
    scriptureReferencing:{
        type: String,
        required:true,
    }, 
    application:{
        type : string ,
    },
    prayer: {
        type : string
    }
    

},
{timestamps:true});
module.exports= mongoose.model('Note',noteSchema);