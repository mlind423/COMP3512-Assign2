/* creates and populates the table data from the data stored in local storage*/
function addTableData(trElement, tdData, buttonName){
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
    button.textContent = buttonName;
    button.setAttribute("value", tdData.song_id);
    trElement.appendChild(button);
}
//Makes a table containing an array of data
function makePlaylist(type, array, id, text, name){
    const table = document.querySelectorAll(type);
    for(let i of table){//This removes the table every time the playlist button is pressed
        i.remove();
    }
    if(array != null){  
        for(let a of array){
            let tr = document.createElement("tr");
            tr.className = name;
            addTableData(tr,a, text);
            document.querySelector(id).appendChild(tr);
        }
    }
}
export{addTableData, makePlaylist};