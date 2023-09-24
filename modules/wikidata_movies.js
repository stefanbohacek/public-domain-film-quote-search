import querystring from 'node:querystring';

import fetch from 'node-fetch';

import { USER_AGENT } from './constants.js';

const query = `
SELECT ?film ?filmLabel (MAX(?date_) as ?date) ?imdbId (MAX(?archiveId_) as ?archiveId) WHERE {
  ?film wdt:P31 wd:Q11424;
        wdt:P6216 wd:Q19652;
        wdt:P577 ?date_;
        wdt:P345 ?imdbId;
        wdt:P724 ?archiveId_.
        
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" . }
} GROUP BY ?film ?filmLabel ?imdbId
`;

export async function getPublicDomainMovies() {
  const dataParam = querystring.stringify({ query, format: 'json' });
  const url = `https://query.wikidata.org/bigdata/namespace/wdq/sparql?${dataParam}`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });
  const data = await resp.json();
  return data.results.bindings.map((movie) => {
    return {
      name: movie.filmLabel.value,
      year: new Date(movie.date.value).getFullYear(),
      qid: movie.film.value.split('/').at(-1),
      imdbId: movie.imdbId?.value,
      archive_url: `https://archive.org/details/${movie.archiveId.value}`,
    };
  });
}
