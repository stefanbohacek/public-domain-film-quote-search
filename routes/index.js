import express from 'express';
import csv from 'csvtojson';

const router = express.Router();
const dataPath = './data';
const filmInfo = await csv().fromFile(`${dataPath}/data.csv`);

router.get('/', (req, res) => {
    res.render('../views/home.handlebars', {
        films: filmInfo.filter(film => film.subtitle_page)
    });
});

export default router;