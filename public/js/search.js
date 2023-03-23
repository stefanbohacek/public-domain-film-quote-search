const search = async (options, resultsContainer) => {
    const introText = document.getElementById('intro-text');
    introText.classList.remove('d-none');
    
    resultsContainer.innerHTML = '';
    let results = [];
    try {
        const resp = await fetch(`/search?query=${options.query}`);
        const respJSON = await resp.json();
        results = respJSON;
        return results;
    } catch (error) {
        console.log(error);
        return results;
    }
}

export default search;