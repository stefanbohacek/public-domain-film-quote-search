import search from './search.js';

const showSearchResults = (searchForm) => {
    const resultsContainer = document.getElementById('results');
    const searchField = document.getElementById('query');
    const query = searchField.value.trim();

    if (query){
        search({
            query
        }, resultsContainer).then(results => {
            // console.log(results);
            if (results && results.length){
                let resultsHTML = '<div class="row">';
            
                results.forEach(film => {
                    if (film && film.info){
                        let subtitles = [];

                        if (film.subtitles){
                            film.subtitles.forEach(subtitle => {
                                subtitles.push(`
                                    <p class="mb-0">${subtitle.subtitles.replaceAll(new RegExp('\\b' + query, 'gi'), (match) => `<mark>${match}</mark>`)}</p>
                                    <p class="text-muted">${subtitle.time}</p>
                                `);
                            });
                        }

                        resultsHTML += `
                        <div class="col-sm-12 mt-3 mb-3">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <a href="${film.info.video_page}" target="_blank">
                                        <img class="movie-poster" loading="lazy" width="182" height="268" src="/images/thumbnails/${film.info.id}.jpg" alt="">
                                    </a>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="card-title">
                                        ${film.info.title}
                                        <span class="text-muted">${film.info.year}</span>
                                    </h5>
                                    <div class="pt-4 pl-2">${subtitles.join('')}</div>
                                    <a class="btn btn-dark btn-sm" href="${film.info.video_page}" target="_blank">Watch and download</a>                                    
                                    <a class="btn btn-light btn-sm" href="${film.info.subtitle_page}" target="_blank">Download subtitles</a>                                    
                                </div>
                            </div>
                        </div>
                        `;
                    }
                });
                
                resultsHTML += `
                </div>
                `;

                resultsContainer.innerHTML = resultsHTML;
            } else {
                resultsContainer.innerHTML = '<p>Nothing found.</p>';
            }         
        });
    } else {
        alert('Search field is empty.');
    }
}

export default showSearchResults;



