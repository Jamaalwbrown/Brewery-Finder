//Event listeners to handle selection of state and city for the app
document.querySelector('#state').addEventListener('change', getState)
document.querySelector('#city-search').addEventListener('click', getCity)

function getState(){
  console.log('change event fired!!');
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
        const breweryObject = data;
        const breweryProperties = Object.keys(breweryObject);
        const list = new BreweryList(data);
        list.showList();

        // console.log(breweryObject);
        // console.log(breweryProperties);

         const breweryNames = data.map(
          (obj) => {
            return obj.name;
          }
        );

        document.querySelector('#city-starter-option').innerText = 'Select a City';
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class BreweryList {
  constructor(listData) {
    this.breweryList = listData
  }

  //showList will show a list of brewery names along with relevant info (type, address, website, etc)
  showList() {
    let tableRef = document.getElementById('brewery-table');
    for (let i = 1; i < tableRef.rows.length;)
    {
      tableRef.deleteRow(i);
    }


    for (let key in this.breweryList) {

      //create a new row with 4 cells in our table for name, type, street, and website
      let newRow = tableRef.insertRow(-1);
      let newNCell = newRow.insertCell(0);
      let newTCell = newRow.insertCell(1);
      let newSCell = newRow.insertCell(2);
      let newWCell = newRow.insertCell(3);

      //create the text node that will go into our new cells
      let newNText = document.createTextNode(this.breweryList[key].name);
      let newTText = document.createTextNode(this.breweryList[key].brewery_type);
      let newSText = document.createTextNode(this.breweryList[key].street);

      //Create a website link for each brewery in our brewery list
      let newLink = document.createElement('a');
      newLink.href = this.breweryList[key].website_url;
      newLink.title = this.breweryList[key].website_url;
      newLink.appendChild(document.createTextNode(this.breweryList[key].website_url));

      //create the text that goes into each of our new cells in our new row in our table
      newNCell.appendChild(newNText);
      newTCell.appendChild(newTText);
      newSCell.appendChild(newSText);
      newWCell.appendChild(newLink);
 
      console.log(this.breweryList[key].name);
    }
  }
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

