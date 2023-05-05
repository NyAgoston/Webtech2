const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const commentSchema = new Scheme({
    _id:{type:Scheme.Types.ObjectId, auto: true},
    post_id:{type:String, required: true},
    username:{type:String, required: true},
    text:{type:String, required: true},
    date:{type:String, required: true},
    
},{
    versionKey: false
});

const comment = mongoose.model('comment',commentSchema)

module.exports = comment;