const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/MailRoutes.js');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
    credentials: true,
};

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Im working');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});