//Event listeners to handle selection of state and city for the app
document.querySelector('#state').addEventListener('change', getState)
document.querySelector('#city-search').addEventListener('click', getCity)

const limitPerPage=50;
const apiUrl= "https://api.openbrewerydb.org/breweries";

async function getBreweries(pageNo = 1, state){
  const actualUrl = apiUrl + `?per_page=${limitPerPage}&page=${pageNo}&by_state=${state}`;

  let apiResults = await fetch(actualUrl)
  .then(resp=>{
  return resp.json();
  });
  
  return apiResults;
  
  }

  async function getEntireBreweryList(pageNo = 1, state) {
    const results = await getBreweries(pageNo, state);
    console.log("Retreiving data from API for page : " + pageNo);
    if (results.length > 0) {
      return results.concat(await getEntireBreweryList(pageNo + 1, state));
    } else {
      return results;
    }
  }

  //getState async function returns the cities for a selected state. It is fired when the select statement is changed to a state
  async function getState() {
    console.log('change event fired!!');
    const stateSelect = document.querySelector('#state');
    const stateChoice = stateSelect.options[stateSelect.selectedIndex].value.toLowerCase();
    console.log(stateChoice);
    const select = document.querySelector('#city');
    const entireList = await getEntireBreweryList(1 , stateChoice);
    console.log(entireList);

    // Put the cities for a given state into a list of options the user can select
    const breweryCities = entireList.map(
      (obj) => {
        return obj.city;
      }
    ).filter(
      (item, index, arr) => {
        return arr.indexOf(item) == index
      }
    );

    //If there are options in the the select statement from previous search, get rid of them to replace with new city options
    const citySelect = document.getElementById("city")
    for (let i = 1; i < citySelect.length;)
    {
      console.log('city option array is:' + citySelect.length);
      citySelect.remove(1)
    }

     // Put the cities for a given state into a list of options the user can select
     for(let i=0; i < breweryCities.length; i++) {
      const option = document.createElement('option');
      option.value = breweryCities[i];
      option.innerText = breweryCities[i];
      select.appendChild(option); 
    }

    document.querySelector('#city-starter-option').innerText = 'Select a City';
    console.log(breweryCities);

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


//Class to hold a list of breweries we retrieve after selecting a city
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
      let newNCell = newRow.insertCell(0);    //insert new Name Cell into the table
      let newTCell = newRow.insertCell(1);    //insert new Brewery Type Cell into the table
      let newSCell = newRow.insertCell(2);    //insert new Street Cell into the table
      let newSTCell = newRow.insertCell(3);   //insert new State Cell into the table     
      let newCCell = newRow.insertCell(4);    //insert new City Cell into the table
      let newWCell = newRow.insertCell(5);    //insert new Website Cell into the table

      //create the text node that will go into our new cells
      let newNText = document.createTextNode(this.breweryList[key].name);
      let newTText = document.createTextNode(this.breweryList[key].brewery_type);
      let newSText = document.createTextNode(this.breweryList[key].street);
      let newSTText = document.createTextNode(this.breweryList[key].state);
      let newCText = document.createTextNode(this.breweryList[key].city);
      

      //create the text that goes into each of our new cells in our new row in our table
      newNCell.appendChild(newNText);
      newTCell.appendChild(newTText);
      newSCell.appendChild(newSText);
      newSTCell.appendChild(newSTText);
      newCCell.appendChild(newCText);

     //Create a website link for each brewery in our brewery list
     if(this.breweryList[key].website_url === null){
      let newWText = document.createTextNode('Website not available');
      newWCell.appendChild(newWText);
    }
    else {
      let newLink = document.createElement('a');
      newLink.href = this.breweryList[key].website_url;
      newLink.title = this.breweryList[key].website_url;
      newLink.appendChild(document.createTextNode(this.breweryList[key].website_url));
      newWCell.appendChild(newLink);
    }
     
 
      console.log(this.breweryList[key].name);
    }
  }
}

//Definition for the Breweryinfo class which holds the data we wish to display to users of the application
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

