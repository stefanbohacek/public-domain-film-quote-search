import { writeMovieMetadata } from '../modules/opensubtitles.js';

const force = process.argv.indexOf('-f') !== -1;
const verbose = process.argv.indexOf('-v') !== -1;

// This will fetch public domain movies from Wikidata, then look up if they have
// any subtitle data in opensubtitles. If they do, they are written to
// data/movies.jsonl with the subtitle data that was fetched from opensubtitles.
// This JSON file can later be used to automatically download the subtitles from
// the API.
//
// Provide your opensubtitles.com API_KEY on the command line and run this
// script as `$ API_KEY=example1234 node bin/fetch_movies.json
//
// Args: boolean force - overwrite an existing movies.json boolean verbose -
//   used for verbose logging.
await writeMovieMetadata(force, verbose);
