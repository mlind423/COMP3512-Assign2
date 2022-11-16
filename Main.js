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
        addTableData(tr,a);
        document.querySelector("#songs").appendChild(tr);
    }
    document.querySelector("#tableHeader").addEventListener("click", (e) =>{
        data.sort((a,b) =>{
            if (a.title < b.title) {return -1};
            if (a.title > b.title) {return 1};
            return 0;
        });
        document.querySelector('table').innerHTML = `<caption>Main section/Browse</caption>
                <tr id="tableHeader">
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Popularity</th>
                </tr>`;
        for (let a of data){
            let tr = document.createElement("tr");
            addTableData(tr,a);
            document.querySelector("#songs").appendChild(tr);
        }
        
    }); 
}); 
