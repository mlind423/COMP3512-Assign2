document.addEventListener("DOMContentLoaded", function(){
    const artists = JSON.parse(artist);
    const genres = JSON.parse(genre);
    createOpt("artist", artists);
    createOpt("genre", genres);

    function createOpt(id, data){
        for(a of data){
            const opt = document.createElement('option');
            opt.textContent = a.name;
            opt.setAttribute('value', a.id);
            document.querySelector(`#${id}`).appendChild(opt);
        }
    }
    
});

