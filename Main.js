document.addEventListener("DOMContentLoaded", function(){
    const artists = JSON.parse(artist);
    const genres = JSON.parse(genre);
    const data = JSON.parse(localStorage.getItem("data"));
    createOpt("artist", artists);
    createOpt("genre", genres);
    /* creates and populates the table data from the data stored in local storage*/
    function addTableData(trElement, tdData){
        trElement.setAttribute("data-songID", tdData.song_id);
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
}); 
