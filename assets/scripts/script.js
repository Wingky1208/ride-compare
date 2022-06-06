let savedAddresses = {
  home: "",
  work: ""
};
let selectMenu = document.getElementById("saved");
let errorDisplay2 = document.getElementById("errorMessage2");
let errorDisplay = document.getElementById("errorMessage");
let saveAddressButton = document.getElementById('saveAddress');
let useAddressButton = document.getElementById('useSaved');

let post = {'origin': {}, 'dest': {}};
let rideData = {};

// modal showup 
const rideModal = document.getElementById('rideModal')
rideModal.addEventListener('show.bs.modal', event => {

  // Button that triggered the modal
  const button = event.relatedTarget;
})

//once saveAddress button is clicked, save location to local storage
saveAddressButton.addEventListener('click', function (event) {
  //clear error field
  errorDisplay.textContent = "";

  //take address from modal input
  const modalBodyInput1 = document.querySelector('#start-point');
  const startPoint = modalBodyInput1.value;

  // save to local storage based on selected tag
  if (selectMenu.value === "Home") {
    savedAddresses.home = startPoint;
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
  } else if (selectMenu.value === "Work") {
    savedAddresses.work = startPoint;
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
  } else {
    errorDisplay.textContent = "Please select a tag from the dropdown.";
  }
})


//UseAddress button is clicked
useAddressButton.addEventListener('click', function (event) {
  //clear error field
  errorDisplay.textContent = "";
  //take addresses from local storage
  savedAddresses = JSON.parse(localStorage.getItem("savedAddresses"));
  const modalBodyInput1 = document.querySelector('#start-point');
  // Add to input box for search
  if (selectMenu.value === "Home") {
    modalBodyInput1.value = savedAddresses.home;

  } else if (selectMenu.value === "Work") {
    modalBodyInput1.value = savedAddresses.work;

  } else {
    errorDisplay.textContent = "Please select a tag from the dropdown.";
  }
})

//on page load, load saved data
function init() {

  savedAddresses = JSON.parse(localStorage.getItem("savedAddresses"));

  if (savedAddresses === null) {
    let savedAddresses = new Object();
    savedAddresses.home = "";
    savedAddresses.work = ""; 
    window.localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
}
}

//Run init on page load
init();

//once checkPrice button is clicked, run fetch requests

let checkPriceButton = document.getElementById('checkPrice');
checkPriceButton.addEventListener('click', function (event) {

  //take destination from modal input
  let destinationLocation
  let originLocation
  let modalBodyInput1 = document.querySelector('#destination');
  let destination = modalBodyInput1.value;

  if (destination === "") {
    errorDisplay2.textContent = "Please enter a valid address.";
  } else {
    destinationLocation = getLocationData(destination, 'destination');
  }

  // tka eorigin from modal input
  let modalBodyInput2 = document.querySelector('#start-point');
  let startPoint = modalBodyInput2.value;

  if (startPoint === "") {
    errorDisplay.textContent = "Please enter a valid address.";

  } else {
    originLocation = getLocationData(startPoint, 'origin');
  };

  //Get price and time estimates from Lyft
  //getLyftCosts(originLatLon, destinationLatLon);

  //Get price and time estimates from Uber
  //getUberCosts(originLatLon, destinationLatLon);
  //call Lyft API using origin and destination data
  //Call Uber API using origin and destination data


  /*output info to results page for each service including
  -distance
  -(UBER) high + low estimates (numbers), estimate (string)
  -duration
  -currency code?
  -UBER display name (uber, uberXL, etc.)

  error code built into UBER's API, if distance<100 miles, HTTP status 422*/
})

// connecting to the custom backend to get the data
// fixed backlogged data
function postData() { 
  console.log(post); 
  let backend = 'https://d979-142-185-241-49.ngrok.io';
  let settings = {
    "url": backend,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": 'application/json'
    },
    "data": JSON.stringify(post),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    fetch(`${backend}/data`, {
        method: "GET"
    })
    .then(resp => resp.text())
    .then(function(result) {
        console.log(result);
        let res = JSON.parse(result);
        data = res[Object.keys(res)[0]];
        uber = data[Object.keys(data)[0]];
        lyft = data[Object.keys(data)[1]];

        if (uber !== undefined) {
          uberPrice = uber[Object.keys(uber)[0]];
        } else {
          uberPrice = 0;
        }

        if (lyft !== undefined) {
          lyftPrice = lyft[Object.keys(lyft)[0]];
        } else {
          lyftPrice = 0;
        }

        let params = new URLSearchParams({
            "uberPrice" : uberPrice,
            "lyftPrice": lyftPrice,
            "destination": post['dest'].street
        });

        params['uberPrice'] = uberPrice;
        params['lyftPrice'] = lyftPrice;
        params['destination'] = post['dest'].street;

        window.location = (`result?${params.toString()}`);

        console.log(`Uber Price: ${uberPrice} & Lyft Price: ${lyftPrice}`);
    })
  })
}

function getApi(requestUrl, type) {
  fetch(requestUrl)
    .then(function (response) {


      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          let location = {
            street: data.results[0].locations[0].street,
            city: data.results[0].locations[0].adminArea5,
            country: data.results[0].locations[0].adminArea1,
            postal_code: data.results[0].locations[0].postalCode
          }

          let latlon = [data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng];
          //check if search matched address; if not, call returns the below latitude and longitude by default.
          //therefore if the below latitude and longitude are returned, there were no results for the search.
          let errorDisplay = document.getElementById("errorMessage")
          console.log(location);
          if (type === 'origin') {
            post['origin'] = location;
            console.log(post);
            postData(); // kind of scuffed but this needs to be here to actually send all the data in at the same time vs being buffered between button clicks
          } else if (type === 'destination') {
            post['dest'] = location;
            console.log(post);
          }
          if (latlon == [39.78373, -100.445882]) {

            errorDisplay.textContent = "No results found for this address.";
            return;
          } else {
            //console.log(location);
            return location;

          }
        })
      }
    })
}


function getLocationData(searchLocation, type) {
  let requestUrl = "https://open.mapquestapi.com/geocoding/v1/address?key=hhrCIA8KyYUTDcwR5122SGvidu2ajGro&location=" + searchLocation;
  getApi(requestUrl, type);
};