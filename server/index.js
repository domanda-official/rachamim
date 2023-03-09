import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import P6EnglishQuestionRoute from './routes/P6EnglishQuestionRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '../client/build')))

app.use(express.static(path.join(new URL('.', import.meta.url).pathname, '../client/build')))


app.use('/P6EnglishQuestions', P6EnglishQuestionRoute)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(new URL('.', import.meta.url).pathname, '../client/build/index.html'));
});


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://bobby:7Oilwinegrain@chutzpah.hioly.mongodb.net/questions?authSource=admin&replicaSet=atlas-qc02nm-shard-0&readPreference=primary&ssl=true';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

process.env.NODE_ENV = "production";
    