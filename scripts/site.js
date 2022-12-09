"use strict"

let cities = [
    {name: "New York, NY",
    latitude: 40.7128,
    longitude: -74.0060,
    },
    {name: "Los Angeles, CA",
    latitude: 34.0522,
    longitude: -118.2437,
    },
    {name: "Chicago, IL",
    latitude: 41.8781,
    longitude: -87.6298,
    },
    {name: "Philadelphia, PA",
    latitude: 39.9526,
    longitude: -75.1652,
    },
    {name: "Tampa, FL",
    latitude: 27.9506,
    longitude: -82.4572,
    }
];





       
window.onload = function () {

    let cityList = document.getElementById("cityList")
    cityList.onchange = cityListOnChange;
  
    populateCityList();
  }
  
  
  function populateCityList(){
   
    let cityList = document.getElementById("cityList");
    
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a City!";
    cityList.appendChild(defaultOption);
    
    for (let city of cities){
      let newOption = document.createElement("option");
      newOption.value =city.name;
      newOption.textContent = city.name;
      cityList.appendChild(newOption);
    }
  }

  function cityListOnChange(){

    let cityList = document.getElementById("cityList").value;
    let selectCityLatitude = "";
    let selectCityLongitude ="";
    document.getElementById("displayTable").innerHTML =""
     
    for(let city of cities){
      
      if(city.name.includes(cityList)){
        selectCityLatitude = city.latitude
        selectCityLongitude = city.longitude
      }
    }
    
    fetch(`https://api.weather.gov/points/${selectCityLatitude},${selectCityLongitude}`)
    .then(response => response.json()) 
    .then(data => {
      let weatherUrl = data.properties.forecast;
      displaytable(weatherUrl)
     } );
     
     if(cityList == ""){
      document.getElementById("displayTable").style.display = "none"
     }
     else{
      document.getElementById("displayTable").style.display = "block"
     }
     
  }
  
  

   
  function displaytable(weatherUrl){
  
    let displayTable = document.getElementById("displayTable")
   
    fetch(weatherUrl)
    .then(response => response.json()) 
    .then(data => {

       let period = data.properties.periods
      
            for(let i=0; i<period.length; i++) {
             
               let row = displayTable.insertRow(-1);
               let cell1 = row.insertCell(0);
               let cell2 = row.insertCell(1);
               let cell3 = row.insertCell(2);
               let cell4 = row.insertCell(3);
               let cell5 = row.insertCell(4);
               cell1.innerHTML = period[i].name;
               cell2.innerHTML = period[i].temperature;
               cell3.innerHTML = period[i].temperatureUnit;
               cell4.innerHTML = period[i].shortForecast;
               cell5.innerHTML = period[i].windSpeed;
              
    } });

}