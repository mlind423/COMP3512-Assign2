import {makePlaylist} from "./TableCreator.js"; 
document.addEventListener("DOMContentLoaded", function(){
    //some inital setupt things
    let favorites = [];
    document.querySelector('.song').style.display = 'none';
    document.querySelector('.playlists').style.display = 'none';
    document.querySelector('#credits').style.display = 'none';
    const artists = JSON.parse(artist);
    const genres = JSON.parse(genre);
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    createOpt("artist", artists);
    createOpt("genre", genres);
    hoverHandler("#songs");
    hoverHandler("#list");


    //event listener for filtering the songs based on what row header is clicked.
    document.querySelector("#tableHeader").addEventListener("click", (e) =>{
        let sort = e.target.textContent.toLowerCase();
        let text = e.target.textContent;
        if(text.includes('▼')){
            text = text.replace(/.$/, "▲");
            e.target.textContent = text;
        }else{
            text = text.replace(/.$/, "▼");
            e.target.textContent = text;
        }
        //I hate how long this is
        if(sort == 'title ▼'){
            data.sort((a,b) =>{
                if (a.title < b.title) {return -1};
                if (a.title > b.title) {return 1};
                return 0;
            });
        }else if(sort == 'artist ▼'){
            data.sort((a,b) =>{
                if (a.artist.name < b.artist.name) {return -1};
                if (a.artist.name > b.artist.name) {return 1};
                return 0;
            });
        }else if(sort == 'genre ▼'){
            data.sort((a,b) =>{
                if (a.genre.name < b.genre.name) {return -1};
                if (a.genre.name > b.genre.name) {return 1};
                return 0;
            });
        }else if(sort == 'year ▼'){
            data.sort((a,b) =>{
                if (a.year < b.year) {return -1};
                if (a.year > b.year) {return 1};
                return 0;
            });
        }else if(sort == 'popularity ▼'){
            data.sort((a,b) =>{
                if (a.details.popularity < b.details.popularity) {return -1};
                if (a.details.popularity > b.details.popularity) {return 1};
                return 0;
            });
        }else if(sort == 'title ▲'){
            data.sort((a,b) =>{
                if (a.title > b.title) {return -1};
                if (a.title < b.title) {return 1};
                return 0;
            });
        }else if(sort == 'artist ▲'){
            data.sort((a,b) =>{
                if (a.artist.name > b.artist.name) {return -1};
                if (a.artist.name < b.artist.name) {return 1};
                return 0;
            });
        }else if(sort == 'genre ▲'){
            data.sort((a,b) =>{
                if (a.genre.name > b.genre.name) {return -1};
                if (a.genre.name < b.genre.name) {return 1};
                return 0;
            });
        }else if(sort == 'year ▲'){
            data.sort((a,b) =>{
                if (a.year > b.year) {return -1};
                if (a.year < b.year) {return 1};
                return 0;
            });
        }else if(sort == 'popularity ▲'){
            data.sort((a,b) =>{
                if (a.details.popularity > b.details.popularity) {return -1};
                if (a.details.popularity < b.details.popularity) {return 1};
                return 0;
            });
        }
        makePlaylist(".data", data, "#songs", "Add", 'data');
       
        
    });

    //This is the event listener for the add to playlist button
    document.querySelector('#songs').addEventListener('click', e =>{
        if(e.target.nodeName == 'BUTTON'){
            for(let i of JSON.parse(localStorage.getItem('data'))){
                if(e.target.value == i.song_id){
                    //console.log(i);
                    favorite(i);
                }
            }
        }
    });

    //Event listener for view playlist button
    document.querySelector('#playlistButton').addEventListener('click', e => {
        if(e.target.nodeName == 'BUTTON' && e.target.textContent == 'Playlist'){
            const playlist = JSON.parse(localStorage.getItem('favorites'));
            document.querySelector(".main").style.display = 'none';
            document.querySelector('.playlists').style.display = '';
            document.querySelector('#playlistButton').textContent = "Close View";
            makePlaylist(".fav", playlist, "#list", "Remove", "fav");
            
        }else{
            document.querySelector(".main").style.display = '';
            document.querySelector('.playlists').style.display = 'none';
            document.querySelector('.song').style.display = 'none';
            document.querySelector('#playlistButton').textContent = "Playlist";
        }
    });

    //This enables and disables search options based on which radio button is clicked
    document.querySelector("#search").addEventListener('click', e =>{
        if(e.target.nodeName == "INPUT" && e.target.type == 'radio'){
            if(e.target.id == 'radioTitle'){
                document.querySelector('#title').removeAttribute('disabled');
                document.querySelector('#artist').setAttribute('disabled', 'true'); 
                document.querySelector('#genre').setAttribute('disabled', 'true');
                document.querySelector('#radioTitle').setAttribute('checked', 'true');
            }else if(e.target.id == 'radioArtist'){
                document.querySelector('#artist').removeAttribute('disabled');
                document.querySelector('#title').setAttribute('disabled', 'true'); 
                document.querySelector('#genre').setAttribute('disabled', 'true');
                document.querySelector('#radioArtist').setAttribute('checked', 'true');
            }else{
                document.querySelector('#genre').removeAttribute('disabled');
                document.querySelector('#artist').setAttribute('disabled', 'true'); 
                document.querySelector('#title').setAttribute('disabled', 'true');
                document.querySelector('#radioGenre').setAttribute('checked', 'true');
            }
        }
    });

    //This reenables every single search option (clear button)
    document.querySelector("#search").addEventListener('click', e =>{
        if(e.target.nodeName == "BUTTON" && e.target.type == 'button'){ 
            document.querySelector('#title').value = ''; 
            document.querySelector('#radioTitle').removeAttribute('checked'); 
            document.querySelector('#radioArtist').removeAttribute('checked'); 
            document.querySelector('#radioGenre').removeAttribute('checked'); 
            document.querySelector('#artist').removeAttribute('disabled'); 
            document.querySelector('#title').removeAttribute('disabled');
            document.querySelector('#genre').removeAttribute('disabled'); 
            makePlaylist(".data", data, ".main #songs", "Add", "data");  
        }
    });

    //Filters the songs page based on inputs from user
    document.querySelector('#submit').addEventListener('click', e =>{
        e.preventDefault();
        if(e.target.type == "submit"){
            let title;
            let artist;
            let genre;
            let filtered = [];
            if(document.querySelector('#radioTitle').hasAttribute('checked')){
                title = document.querySelector('#title').value;
                console.log(typeof title);
                filtered = data.filter(e => {
                    if(String(e.title).toLowerCase().includes(title.toLowerCase())){
                        return e;
                    }
                });
                
            }else if(document.querySelector('#radioArtist').hasAttribute('checked')){
                artist = document.querySelector('#artist').value; 
                filtered = data.filter(e =>{
                    return e.artist.id == artist;
                });
            }else if(document.querySelector('#radioGenre').hasAttribute('checked')){
                genre = document.querySelector('#genre').value
                filtered = data.filter(e => {
                    return e.genre.id == genre;
                });
            }
            makePlaylist(".data", filtered, "#songs", "Add", "data");
        }
    });
    //This handles the remove button for the playlist page
    document.querySelector('#list').addEventListener('click', e =>{
        if(e.target.nodeName == "BUTTON"){
            favorites = [];
            favorites = [...JSON.parse(localStorage.getItem('favorites'))];
            let index = favorites.indexOf(favorites.find(i=>{return i.song_id == e.target.value}));
            if(index > -1){
                favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            makePlaylist(".fav", favorites, "#list", "Remove", "fav");
        }
    });
    //This handles the credit button when it is hovered over
    document.querySelector("#creditButton").addEventListener('mouseover', e=>{
        if(e.target.nodeName == "BUTTON"){
            let credits = document.querySelector("#credits");
            credits.style.display = '';
            document.querySelector('#creditButton').textContent = "Credits ▲";
            setTimeout(() => {
                credits.style.display = 'none';
                document.querySelector('#creditButton').textContent = 'Credits ▼';
            }, 5000);
        }
    });
    
    //creates the option lists in the form using the data provided in json files
    function createOpt(id, optionData){
        for(let a of optionData){
            const opt = document.createElement('option');
            opt.textContent = a.name;
            opt.setAttribute('value', a.id);
            //opt.setAttribute('id', a.name);
            document.querySelector(`#${id}`).appendChild(opt);
        }
    }

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
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    //Handles the table hover and click events for both the main table and the playlist table
    function hoverHandler(id){
        //event listener for mouseing over songs. 
        document.querySelector(id).addEventListener('mouseover', e => {
            if(e.target.nodeName == "TD"){
                const node = e.target.parentNode;
                node.style.backgroundColor = 'grey'; // change this color to change the hover highlight color
                node.style.cursor = 'pointer'; 
            }
        });

        //event listener for no longer being over a song.
        document.querySelector(id).addEventListener('mouseout', e => {
            if(e.target.nodeName == "TD"){
                const node = e.target.parentNode;
                node.style.backgroundColor = 'white';
            }
        });

        /**
         * Event listener for when a single song is clicked.
         */
        document.querySelector(id).addEventListener('click', e => {
            if(e.target.nodeName == "TD"){
                const node = e.target.parentNode;
                console.log(node.getAttribute('data-songid')); //gives the song id 
                document.querySelector('.main').style.display = 'none';
                document.querySelector('.playlists').style.display = 'none';
                document.querySelector('.song').style.display = '';
                document.querySelector('#playlistButton').textContent = "Close View";
                singleSongView(node.getAttribute('data-songid'));
            }
        });
    }
    
    //Function to insert data to the single song page
    function singleSongView(songID){
        let song = data.find(song => song.song_id == songID);
        let length = lengthformat(song.details.duration);
        document.querySelector("#songInfo").textContent = 
        `${song.title} by ${song.artist.name}: A ${song.genre.name} song, made in the year ${song.year}. (length ${length})`;
        addAnalysisData(song);
    }
    //function to format the seconds to a human readable format
    function lengthformat(seconds){
        console.log(seconds);
        let minutes = Math.floor(seconds / 60);
        let remainderSeconds = seconds % 60;
        let timeFormated = `${minutes}:${remainderSeconds}`;
        return timeFormated;
    }
    //function to format the seconds to a human readable format
    function addAnalysisData(song){
        document.querySelector("#bpm").textContent =            `bpm: ${song.details.bpm}`;
        document.querySelector("#energy").textContent =         `energy: ${song.analytics.energy}`;
        document.querySelector("#danceability").textContent =   `danceability: ${song.analytics.danceability}`;
        document.querySelector("#liveness").textContent =       `liveness: ${song.analytics.liveness}`;
        document.querySelector("#valence").textContent =        `valence: ${song.analytics.valence}`;
        document.querySelector("#acousticness").textContent =   `acousticness: ${song.analytics.acousticness}`;
        document.querySelector("#speechiness").textContent =    `speechiness: ${song.analytics.speechiness}`
        document.querySelector("#popularity").textContent =     `popularity: ${song.details.popularity}`
        ;
    }
}); 
