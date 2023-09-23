# Public Domain Film Quote Search

# Adding a new film

1. Start by adding information about the film to [data/data.csv](https://github.com/stefanbohacek/public-domain-film-quote-search/blob/main/data/data.csv).

- `title`: The name of the film.
- `year`: The year when the film was released.
- `id`: The `id` of the film follows the format `film-title-YEAR`.
- `video_page`: Link to the movie on [archive.org](https://archive.org/) where it can be downloaded.
- `subtitle_page`: Link to a page where the subtitles can be downloaded, typically on [opensubtitles.org](https://www.opensubtitles.org). (Be sure to update the *Sources* section below if you use a different website.)

2. Download the subtitle file from the `subtitle_page`, save it in the format `film-title-YEAR-en.srt`, and move it to the `data/subtitles` folder.
3. Add the movie poster (ideal size: 182px × 268px) to `public/images/thumbnails`. The file name should be in the format `film-title-YEAR.jpg`.

Here's a few links where you can find films in the public domain:

- [List of films in the public domain in the United States](https://en.wikipedia.org/wiki/List_of_films_in_the_public_domain_in_the_United_States) on Wikipedia
- [WikiFlix](https://commons.wikimedia.org/wiki/User:Spinster/WikiFlix), a prototype for browsing and watching full-length, public domain or Creative Commons-licensed films on Wikimedia Commons

For comparison, here's the [full list of films added to PDFQS](https://public-domain-film-quote-search.stefanbohacek.dev/films).

## Development

```sh
npm install
nodemon -L
```

## Sources

### Subtitles

- [opensubtitles.org](https://opensubtitles.org)

### Images

- [opensubtitles.org](https://opensubtitles.org)
