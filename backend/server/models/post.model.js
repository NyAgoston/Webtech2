const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const postSchema = new Scheme({
    _id:{type:Scheme.Types.ObjectId, auto: true},
    title:{type:String, required: true},
    text:{type:String, required: true},
    username:{type:String, required: true},
    
},{
    versionKey: false
});

const post = mongoose.model('post',postSchema)

module.exports = post;