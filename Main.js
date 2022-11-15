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
            //opt.setAttribute('id', a.name);
            document.querySelector(`#${id}`).appendChild(opt);
        }
    }

    document.querySelector('#artist').addEventListener('input', (e) =>{
        console.log(e.target.value); //Gives the value of the artist that is clicked
    });
    document.querySelector('#genre').addEventListener('input', (e) => {
        console.log(e.target.value); //Gives the value of the genre that was clicked
    });

});

