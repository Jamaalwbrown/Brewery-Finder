//Example fetch using pokemonapi.co
document.querySelector('#state-search').addEventListener('click', getState)
document.querySelector('#city-search').addEventListener('click', getCity)

function getState(){
  const stateChoice = document.querySelector('#state').value;
  const pageNum = 1;
  const select = document.querySelector('#city');

  const urlState = `https://api.openbrewerydb.org/breweries?per_page=50&page=${pageNum}&by_state=${stateChoice}`;
 

  fetch(urlState)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        //extract all the unique cities for the given state input
        const breweryCities = data.map(
          (obj) => {
            return obj.city;
          }
        ).filter(
          (item, index, arr) => {
            return arr.indexOf(item) == index
          }
        );


        // Put the cities for a given state into a list of options the user can select
        for(let i=0; i < breweryCities.length; i++) {
          const option = document.createElement('option');
          option.value = breweryCities[i];
          option.innerText = breweryCities[i];
          select.appendChild(option); 
        }

        document.querySelector('#city-starter-option').innerText = 'Select a City';

        console.log(breweryCities);
        // if( data.media_type === 'image' ){
        //   document.querySelector('img').src = data.hdurl
        // }else if(data.media_type === 'video'){
        //   document.querySelector('iframe').src = data.url
        // }
       
        // document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function getCity(){
  const stateChoice = document.querySelector('#state').value;
  const cityChoice = document.querySelector('#city').value;
  const pageNum = 1;
  const table = document.querySelector('#brewery-table');

  const urlCity = `https://api.openbrewerydb.org/breweries?per_page=50&page=${pageNum}&by_state=${stateChoice}&by_city=${cityChoice}`;
 
  fetch(urlCity)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        //Data is an array of brewery objects. Grab all the brewery object key fields to put into html table
        const breweryObject = data[0];
        const breweryProperties = Object.keys(breweryObject);

        console.log(breweryObject);
        console.log(breweryProperties);

        
         const breweryNames = data.map(
          (obj) => {
            return obj.name;
          }
        );

   
        // Put the names for a given state into a table
        for(let i=0; i < breweryNames.length; i++) {
          const tableRowName = document.createElement('tr');
          tableRowName.value = breweryNames[i];
          tableRowName.innerText = breweryNames[i];
          table.appendChild(tableRowName); 
        }

        document.querySelector('#city-starter-option').innerText = 'Select a City';

        // if( data.media_type === 'image' ){
        //   document.querySelector('img').src = data.hdurl
        // }else if(data.media_type === 'video'){
        //   document.querySelector('iframe').src = data.url
        // }
       
        // document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class Breweryinfo {
  constructor(breweryData) {
    this.name = breweryData.name,
    this.type = breweryData.brewery_type,
    this.street = breweryData.street,
    this.address2 = breweryData.address_2,
    this.website = breweryData.website_url,
    this.state = breweryData.state,
    this.city = breweryData.city
  }
}

