const search = async (options, resultsContainer) => {
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