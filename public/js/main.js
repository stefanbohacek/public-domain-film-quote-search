import onReady from './onReady.js';
import showSearchResults from './showSearchResults.js';
import enableDarkMode from './darkMode.js';

onReady(() => {
    enableDarkMode();
    const searchForm = document.getElementById('search-form');

    if (searchForm){
        searchForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            showSearchResults(searchForm);
        });
    }
});
