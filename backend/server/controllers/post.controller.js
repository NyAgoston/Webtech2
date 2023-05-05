const express = require('express');
const httpStatusCode = require('http-status-codes');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const post = require('../models/post.model');
const User = require('../models/user.model');

//get all post.
exports.get = (req,res) =>{
    post.find().sort({date: -1}).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};
//get single post by id
exports.getSinglePost = (req,res) =>{
    let id = req.body.id;   
    post.findById(id).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
     }) 
};
//get posts by id
exports.getPost = (req,res) =>{
    let id = "null";
    let token = req.session.token;
    let name = "null";
    jwt.verify(token, config.secret, (err, decoded) => {
        id = decoded.id;
    });
    User.findOne({_id: id}).then(docs =>{
        post.find({username: docs.username}).sort({date: -1}).then(docs=>{
            res.send(docs);
        }).catch(err=>{
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
        })
    });
};
//create new post
exports.post = (req,res) =>{
    const obj = req.body;
    post.create(obj).then(doc=>{
        res.status(httpStatusCode.CREATED).send(doc);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};
//update post
exports.put = (req,res) =>{
    let id = req.body.id;
    const obj = req.body;
    post.findByIdAndUpdate(id,{username:obj.username, date:obj.date, title:obj.title,text:obj.text}).then(doc=>{
        res.status(httpStatusCode.OK).send(doc);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};
//delete post by id
exports.delete = (req,res) =>{
    let id = req.body.id;
    post.findByIdAndDelete(id).then(docs=>{
        res.send(docs);
    }).catch(err=>{
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    })
};
