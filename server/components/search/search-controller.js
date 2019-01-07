const { Question, Reply } = require('../content/content-model');
const Thread = require('../thread/thread-model');
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
        await Reply.deleteMany({});
        await Thread.deleteMany({});

        let frank = await  User.create({name: 'frank', email:'frank@test.com'});
        let jhon = await  User.create({name: 'jhon', email:'jhon@test.com'});
        let questions = await Question.create([
            {title: "This is the first title", body: "This is the first body", authorId: mongoose.Types.ObjectId(frank._id)},
            {title: "This is the second title", body: "This is the second body", authorId: mongoose.Types.ObjectId(frank._id)},
            {title: "This is the third title", body: "This is the third body", authorId: mongoose.Types.ObjectId(jhon._id)},
            {title: "This is the fourth title", body: "This is the fourth body", authorId: mongoose.Types.ObjectId(frank._id)}
        ]); 

        let replies = await Reply.create([
            {body: "This is the first reply to the first question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
            {body: "This is the first reply to the second question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[1]._id)},
            {body: "This is the first reply to the third question", authorId: mongoose.Types.ObjectId(frank._id), questionId: mongoose.Types.ObjectId(questions[2]._id)},
            {body: "This is the second reply to the first question", authorId: mongoose.Types.ObjectId(frank._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
            {body: "This is the third reply to the first question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[0]._id)},
            {body: "This is the second reply to the third question", authorId: mongoose.Types.ObjectId(jhon._id), questionId: mongoose.Types.ObjectId(questions[2]._id)},
        ]);
        
        const threads = [];
        questions.forEach(question => {
            let thread = {
                question: question._id, 
                replies: replies.filter(reply => reply.questionId == question._id).map(el =>  el._id)};
            threads.push(thread);
        });

        await Thread.create(threads);
        console.log('questions', questions);

        res.status(200).json({message: 'Db Populated'})
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
}