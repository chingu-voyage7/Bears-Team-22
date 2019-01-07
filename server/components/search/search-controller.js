const { Question } = require('../content/content-model');
const User = require('../users/user-model');
const mongoose = require('mongoose');

exports.getQuestion = async (req, res ) => {

    const page = req.query.page;
    const query = req.query.q;
    
    // Split query into words then each word is wrapped in 
    // double quotes to allow mongo to recognize those as 
    // multiple phrases hence make a AND research instead of
    // OR research (passing the query 'foo bar' will now return
    // the text with 'foo' AND 'bar' instead of 'foo' OR 'bar'). 
    let qArr = query.split(' ');
    let qString='';
    qArr.map(wrd => {
        qString+= `"${wrd}" `
    })

    try {
        const result = await Question.find({ $text: {$search: qString}}).populate('authorId');
        res.status(200).json({result});
    } catch(err) {
        res.status(500).json(err)   
    }
}

exports.prepopulate = async (req, res, next) => {
    try {
        await User.deleteMany({});
        await Question.deleteMany({});

        let user = await  User.create({name: 'test', email:'test@test.com'});
        await Question.create([
            {title: "This is the first title", body: "This is the first body", authorId: mongoose.Types.ObjectId(user._id)},
            {title: "This is the second title", body: "This is the second body", authorId: mongoose.Types.ObjectId(user._id)},{title: "This is the third title", body: "This is the third body", authorId: mongoose.Types.ObjectId(user._id)},
            {title: "This is the fourth title", body: "This is the fourth body", authorId: mongoose.Types.ObjectId(user._id)}
        ]); 
        /*  - Just write down the documents you want to insert
        await xxxx.create([
            {...},
            ...
        ]); 
        */
        res.status(200).json({message: 'Db Populated'})
    } catch(err) {
        res.status(500).json(err)
    }
}