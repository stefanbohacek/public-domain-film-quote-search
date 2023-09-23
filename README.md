# Public Domain Film Quote Search

# Adding a new film

1. Start by adding information about the film to [data/data.csv](https://github.com/stefanbohacek/public-domain-film-quote-search/blob/main/data/data.csv).

- `title`: The name of the film.
- `year`: The year when the film was released.
- `id`: The `id` of the film follows the format `film-title-YEAR`.
- `video_page`: Link to the movie on [archive.org](https://archive.org/) where it can be downloaded.
- `subtitle_page`: Link to a page where the subtitles can be downloaded, typically on [opensubtitles.org](https://www.opensubtitles.org).

3. Download the subtitle file from the `subtitle_page`, save it in the format `film-title-YEAR-en.srt`, and move it to the `data/subtitles` folder.
2. Add the movie poster (ideal size: 182px × 268px) to `public/images/thumbnails`. The file name should be in the format `film-title-YEAR.jpg`.

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
