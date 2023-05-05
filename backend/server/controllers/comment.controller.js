const httpStatusCode = require('http-status-codes');
const comment = require('../models/comment.model');
//get comments by Post id
exports.getComments = (req,res) =>{
    comment.find({post_id: req.body.post_id}).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
}
//get all comments
exports.getAll = (req,res) =>{
    comment.find().sort({date: -1}).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
}
//create comment
exports.createComment = (req,res) =>{
    const obj = req.body;
    comment.create(obj).then(doc=>{
        res.status(httpStatusCode.CREATED).send(doc);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};