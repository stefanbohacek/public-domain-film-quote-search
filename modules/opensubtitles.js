import fs from 'fs';
import fsPromises from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import fetch from 'node-fetch';

import { getPublicDomainMovies } from './wikidata_movies.js';
import { USER_AGENT } from './constants.js';

async function attachSubtitleMetadata(movie, verbose = false) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('Cannot contact opensubtitles.com without API_KEY= in env');
  }

  const imdbId = movie.imdbId.substring(2);
  const url = `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}`;
  if (verbose) {
    console.log(url);
  }
  const resp = await fetch(url, {
    headers: { 'Api-Key': apiKey, 'User-Agent': USER_AGENT },
  });
  if (!resp.ok) {
    return null;
  }
  const data = await resp.json();

  // If subtitles exist, add them to the movie data. Otherwise return null
  // to filter out this movie.
  if (data.data.length > 0) {
    movie.subtitleData = data.data;
    return movie;
  } else {
    return null;
  }
}

export async function writeMovieMetadata(force = false, verbose = false) {
  const jsonPath = join(
    dirname(fileURLToPath(import.meta.url)),
    '../data/movies.jsonl'
  );
  if (!force && fs.existsSync(jsonPath)) {
    throw new Error('Refusing to overwrite existing data/movies.jsonl');
  }

  if (verbose) {
    console.log('Fetching movies from Wikidata');
  }
  let movies = await getPublicDomainMovies();

  // If a movie has subtitles, it gets a subtitleData field. Otherwise, it
  // gets filterd out.
  for (const movie of movies) {
    const attachedMovie = await attachSubtitleMetadata(movie, verbose);

    // Write the movie to the data file, one JSON object per line.
    if (attachedMovie) {
      await fsPromises.writeFile(
        jsonPath,
        JSON.stringify(attachedMovie) + '\n',
        {
          flag: 'a+',
        }
      );
    }

    // opensubtitles has a rate limit.
    await new Promise((r) => setTimeout(r, 250));
  }
}
