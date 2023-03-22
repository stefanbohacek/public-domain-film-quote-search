import express  from 'express';
import fs  from 'fs';
import NodeCache from 'node-cache';
import parseSubtitles from '../modules/parseSubtitles.js';
import csv from 'csvtojson';

const router = express.Router();
// const appCache = new NodeCache( { stdTTL: 100, checkperiod: 60, maxKeys: 100 } );
const appCache = new NodeCache( { stdTTL: 100, checkperiod: 60 } );

const dataPath = './data';
const subtitlesPath = `${dataPath}/subtitles`;
const filmInfo = await csv().fromFile(`${dataPath}/data.csv`);
console.log(`found ${filmInfo.filter(film => film.subtitle_page).length} movies with subtitles...`);

const search = async (query) => {
    query = query.toLowerCase();
    let results = [];

    const filenames = fs.readdirSync(subtitlesPath);
    filenames.forEach(async file => {
        const subtitlesFullPath = `${subtitlesPath}/${file}`;
        const data = fs.readFileSync(subtitlesFullPath, 'utf8');
        const pattern = new RegExp('\\b' + query, 'gi');

        if (pattern.test(data.toLowerCase())){
            //TODO: Use regex.
            const filmID = file.replace('-en.srt', '').replace('.srt', '');
            const subtitles = parseSubtitles(data);

            results.push({
                info: filmInfo.filter(item => item.id === filmID)[0],
                subtitles: subtitles.filter(item => item.subtitles.toLowerCase().includes(query))
            });
        }
    });

    return results;
}

router.get('/', async (req, res) => {
    if (req.query.query){
        const query = req.query.query;
        const results = await search(query);
        res.send(results);
    } else {
        res.send([]);
    }
});

export default router;