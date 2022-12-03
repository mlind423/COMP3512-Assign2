/* url of song api --- https versions hopefully a little later this semester */	
// I just commented this out to prevent overuse of the api
const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
import {makePlaylist} from "./TableCreator.js"; 
import {core} from "./Main.js"; 
   storedata();
   /* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
      local file). To work correctly, this needs to be tested on a local web server.  
      Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
      use built-in Live Preview.
   */
   
      /*
      This function checks to see if the data is already in local storage or not 
      if it isnt then its loaded from the api and stored in localStorage
      */
      function storedata(){
         if( localStorage.getItem('data') === null){ // idk why i need to check if it contains undefined and not that its undefined.
            console.warn("loading from API");
            getData().then((e) => {
               makePlaylist(".data", e, ".main #songs", "Add", "data"); //Creates the table when the data is loaded from the api 
               localStorage.setItem('data', JSON.stringify(e));
               core(retrieveStorage());
            });
         }else{
            makePlaylist(".data", retrieveStorage(), ".main #songs", "Add", "data");
            document.addEventListener("DOMContentLoaded", core(retrieveStorage()));
            console.log("information already in local storage");
         }
         

      }
      
      function retrieveStorage() {      
         return JSON.parse(localStorage.getItem('data')) || null;
      }
   
      async function getData(){
         const resp = await fetch(api);
         const data = await resp.json();
         return data;
      }
