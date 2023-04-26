const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const userSchema = new Scheme({
    _id:{type:Scheme.Types.ObjectId, auto: true},
    username:{type:String, required: true},
    password:{type:String, required: true},
    email:{type:String,required: false},
    

},{
    versionKey: false
});

const user = mongoose.model('user',userSchema)

module.exports = user;