document.addEventListener("DOMContentLoaded", function(){
    const favorites = [];
    document.querySelector('.song').style.display = 'none';
    document.querySelector('.playlists').style.display = 'none';
    const artists = JSON.parse(artist);
    const genres = JSON.parse(genre);
    const data = JSON.parse(localStorage.getItem("data"));
    createOpt("artist", artists);
    createOpt("genre", genres);
    /* creates and populates the table data from the data stored in local storage*/
    function addTableData(trElement, tdData){
        trElement.setAttribute("data-songid", tdData.song_id);
        let td = document.createElement("td");
        td.textContent = tdData.title;
        trElement.appendChild(td);
        td = document.createElement("td");
        td.textContent = tdData.artist.name;
        trElement.appendChild(td);
        td = document.createElement("td");
        td.textContent = tdData.year;
        trElement.appendChild(td);
        td = document.createElement("td");
        td.textContent = tdData.genre.name;
        trElement.appendChild(td);
        td = document.createElement("td");
        td.textContent = tdData.details.popularity;
        trElement.appendChild(td);
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add";
        button.setAttribute("value", tdData.song_id);
        trElement.appendChild(button);
    }
    function createOpt(id, optionData){
        for(a of optionData){
            const opt = document.createElement('option');
            opt.textContent = a.name;
            opt.setAttribute('value', a.id);
            //opt.setAttribute('id', a.name);
            document.querySelector(`#${id}`).appendChild(opt);
        }
    }
    for (let a of data){
        let tr = document.createElement("tr");
        tr.className = 'data';
        addTableData(tr,a);
        document.querySelector("#songs").appendChild(tr);
    }
    //event listener for filtering the songs based on what row header is clicked.
    document.querySelector("#tableHeader").addEventListener("click", (e) =>{
        const sort = e.target.textContent.toLowerCase();
        console.log(sort);
        if(sort == 'title'){
            data.sort((a,b) =>{
                if (a.title < b.title) {return -1};
                if (a.title > b.title) {return 1};
                return 0;
            });
        }else if(sort == 'artist'){
            data.sort((a,b) =>{
                if (a.artist.name < b.artist.name) {return -1};
                if (a.artist.name > b.artist.name) {return 1};
                return 0;
            });
        }else if(sort == 'genre'){
            data.sort((a,b) =>{
                if (a.genre.name < b.genre.name) {return -1};
                if (a.genre.name > b.genre.name) {return 1};
                return 0;
            });
        }else if(sort == 'year'){
            data.sort((a,b) =>{
                if (a.year < b.year) {return -1};
                if (a.year > b.year) {return 1};
                return 0;
            });
        }else if(sort == 'popularity'){
            data.sort((a,b) =>{
                if (a.details.popularity < b.details.popularity) {return -1};
                if (a.details.popularity > b.details.popularity) {return 1};
                return 0;
            });
        }
        
        const table = document.querySelectorAll('.data');
        for(let i of table){
            i.remove();
        }
        for (let a of data){
            let tr = document.createElement("tr");
            tr.className = 'data';
            addTableData(tr,a);
            document.querySelector("#songs").appendChild(tr);
        }
        
    });
    //event listener for clicking the search button.
    document.querySelector('#search').addEventListener('click', (e) =>{
        if(e.target && e.target.id == "submit"){
            e.preventDefault();
            const title = document.querySelector('#title').value;
            const artist = document.querySelector('#artist').value;
            const genre = document.querySelector('#genre').value;
        }
    });
    //event listener for mouseing over songs. 
    document.querySelector('#songs').addEventListener('mouseover', e => {
        if(e.target.nodeName == "TD"){
            const node = e.target.parentNode;
            node.style.backgroundColor = 'black'; // change this color to change the hover highlight color 
        }
    });
    //event listener for no longer being over a song.
    document.querySelector("#songs").addEventListener('mouseout', e => {
        if(e.target.nodeName == "TD"){
            const node = e.target.parentNode;
            node.style.backgroundColor = 'white';
        }
    });
    /**
     * Event listener for when a single song is clicked.
     */
    document.querySelector("#songs").addEventListener('click', e => {
        if(e.target.nodeName == "TD"){
            const node = e.target.parentNode;
            console.log(node.getAttribute('data-songid')); //gives the song id 
            document.querySelector('.main').style.display = 'none';
            document.querySelector('.song').style.display = '';
        }
    });
    //This is the event listener for the add to playlist button
    document.querySelector('#songs').addEventListener('click', e =>{
        if(e.target.nodeName == 'BUTTON'){
            for(i of JSON.parse(localStorage.getItem('data'))){
                if(e.target.value == i.song_id){
                    //console.log(i);
                    favorite(i);
                }
            }
        }
    });
    //This function adds songs to a playlist and add the popup snackbar to the screen
    function favorite(item){
        const snack = document.querySelector('#snackbar');
        if(favorites.find(e => e.song_id == item.song_id) == undefined){
            favorites.push(item);
            snack.textContent = "Song added to Playlist";
        }else{
            snack.textContent = "Song already in Playlist";
        }
        let x = document.querySelector("#snackbar");
        x.className = "show";
        setTimeout(function(){x.className = x.className.replace("show", ''); }, 3000);
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
}); 
