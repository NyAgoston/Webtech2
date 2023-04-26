const express = require('express');
const httpStatusCode = require('http-status-codes');
const router = express.Router();

const post = require('../models/post.model');
//get all post.
router.get('/',(req,res) =>{
    post.find().then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
});
//get post by id
router.get('/:id',(req,res) =>{
    let id = req.params.id;
    post.findById(id).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
});
//create new post
router.post('/',(req,res) =>{
    const obj = req.body;
    post.create(obj).then(doc=>{
        res.status(httpStatusCode.CREATED).send(doc);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
});
//update post
router.put('/:id',(req,res) =>{
    let id = req.params.id;
    const obj = req.body;
    post.findByIdAndUpdate(id,{name:obj.name, position:obj.position}).then(doc=>{
        res.status(httpStatusCode.OK).send(doc);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
});
//delete user by id
router.delete('/:id',(req,res) =>{
    let id = req.params.id;
    post.findByIdAndDelete(id).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
});



module.exports = router;