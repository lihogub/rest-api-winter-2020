const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@\
${process.env.MONGODBSERVER}:/${process.env.MONGODBNAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) console.log(err);
    }
);

const AchievementSchema = new mongoose.Schema({id: Number, title: String, desc: String}, {collection: 'achievement'});
const AdvantageSchema = new mongoose.Schema({id: Number, title: String, desc: String}, {collection: 'advantage'});
const CompetencySchema = new mongoose.Schema({id: Number, text: String}, {collection: 'competency'});
const ExpertiseSchema = new mongoose.Schema({id: Number, text: String}, {collection: 'expertise'});
const MenuSchema = new mongoose.Schema({
        id: Number,
        ref: String,
        text: String,
        drop: [mongoose.Schema({ref: String, text: String})]
    },
    {
        collection: 'menu'
    }
    )
;
const RateSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    features: [String]
}, {collection: 'rate'});
const WorkerSchema = new mongoose.Schema({id: Number, name: String, job: String}, {collection: 'worker'});
const TestimonialSchema = new mongoose.Schema({id: Number, text: String, sign: String, link: String}, {collection: 'testimonial'});


const Achievement = mongoose.model('Achievement', AchievementSchema);
const Advantage = mongoose.model('Advantage', AdvantageSchema);
const Competency = mongoose.model('Competency', CompetencySchema);
const Expertise = mongoose.model('Expertise', ExpertiseSchema);
const Rate = mongoose.model('Rate', RateSchema);
const Worker = mongoose.model('Worker', WorkerSchema);
const Menu = mongoose.model('Menu', MenuSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);


const cors = require('cors');
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send('Hello World! It is REST API server.');
});

app.get('/api', (req, res) => {
    res.send("You must specify method.");
});

app.get('/api/achievement', (req, res) => {
    Achievement.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/advantage', (req, res) => {
    Advantage.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/competency', (req, res) => {
    Competency.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/expertise', (req, res) => {
    Expertise.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/menu', (req, res) => {
    Menu.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/rate', (req, res) => {
    Rate.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/worker', (req, res) => {
    Worker.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.get('/api/testimonial', (req, res) => {
    Testimonial.find({}, {_id: 0}).exec((err, items) => {
        res.send(items);
    });
});

app.post('/submit', (req, res) => {
    const {name, phone, email, comment, captcha} = req.body
    try {
        if (!captcha)
            throw new Error("No captcha")
        res.send({...req.body, success: true})
    } catch (e) {
        res.send({success: false, error: e.message})
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
