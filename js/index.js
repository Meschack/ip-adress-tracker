let apiData;

// var map = L.map("map").setView([42.27113, -89.094], 13);

const ipAdressContainer = document.getElementById("ip-adress-container");
const locationContainer = document.getElementById("location-container");
const timezoneContainer = document.getElementById("timezone-container");
const ispContainer = document.getElementById("isp-container");

const form = document.querySelector("form");
const ipInput = document.getElementById("inputIP");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ipAdress = ipInput.value;
  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_yVh8FQYdpUoxZ50RPyZYNQmct2f4E&ipAddress=${ipAdress}`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      apiData = [data.location.lat, data.location.lng];
      ipAdressContainer.textContent = data.ip;

      locationContainer.textContent = `${data.location.region} ${data.location.city}, ${data.location.postalCode}`;

      timezoneContainer.textContent = "UTC " + data.location.timezone;
      ispContainer.textContent = data.isp;

      window.initMap = initMap(data.location.lat, data.location.lng);
    });
});

// Initialize and add the map
function initMap(lat = 34.04915, lng = -118.09462) {
  // The location
  const location = { lat: lat, lng: lng };
  // The map, centered at the location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: location,
  });
  // The marker, positioned at the location
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}
