const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


console.log(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@\
${process.env.MONGODBSERVER}:/${process.env.MONGODBNAME}?retryWrites=true&w=majority`);


mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@\
${process.env.MONGODBSERVER}:/${process.env.MONGODBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err)=>{if (err) console.log(err)}
    );

const AchievementSchema = new mongoose.Schema({id: Number, title: String, desc: String}, {collection: 'achievement'});
const AdvantageSchema = new mongoose.Schema({id: Number, title: String, desc: String}, {collection: 'advantage'});
const CompetencySchema = new mongoose.Schema({id: Number, text: String}, {collection: 'competency'});
const ExpertiseSchema = new mongoose.Schema({id: Number, text: String}, {collection: 'expertise'});
const RateSchema = new mongoose.Schema({id: Number, title: String, price: Number, features:[String]}, {collection: 'rate'});
const WorkerSchema = new mongoose.Schema({id: Number, name: String, job: String}, {collection: 'worker'});

const Achievement = mongoose.model('Achievement', AchievementSchema);
const Advantage = mongoose.model('Advantage', AdvantageSchema);
const Competency = mongoose.model('Competency', CompetencySchema);
const Expertise = mongoose.model('Expertise', ExpertiseSchema);
const Rate = mongoose.model('Rate', RateSchema);
const Worker = mongoose.model('Worker', WorkerSchema);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/get/achievement', (req, res) => {
    Achievement.find({}, {_id: 0}).exec((err, items)=>{res.send(items)})
});

app.get('/get/advantage', (req, res) => {
    Advantage.find({}, {_id: 0}).exec((err, items)=>{res.send(items)})
});

app.get('/get/competency', (req, res) => {
    Competency.find({}, {_id: 0}).exec((err, items)=>{res.send(items)})
});

app.get('/get/expertise', (req, res) => {
    Expertise.find({}, {_id: 0}).exec((err, items)=>{res.send(items)})
});

app.get('/get/rate', (req, res) => {
    console.log("rate req");
    Rate.find({}, {_id: 0}).exec((err, items)=>{console.log(items); res.send(items);})
});

app.get('/get/worker', (req, res) => {
    Worker.find({}, {_id: 0}).exec((err, items)=>{res.send(items)})
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
