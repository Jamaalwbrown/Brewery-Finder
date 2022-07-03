# Find My Brewery 
Find local brewery and cidery information using this application. Select a state and city and see what breweries are located in the area along with relevant details about each one. 

**Link to project:** https://jamaalwbrown.github.io/Brewery-Finder/

![alt tag](img/Beer-for-Readme.jpg)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

This application uses front-end Javascript to fetch data from the OpenBreweryDB API

## Optimizations

Adding the functionality of being able to drill down to even more data when a single brewery is selected from the list. 

## Lessons Learned:

Working with api JSON data and filtering for unique values using the .map and .filter array methods. When hitting the OpenBreweryDB API you generally get a list of all
the breweries within the state selected. Since this leads to having multiple breweries with the same city, I had to use the .map and .filter array methods to extract a unique
list of cities from the list of breweries retrieved. With that I had the list of unique cities within each state I could use to enable the user to search for a specific city in each state. 
