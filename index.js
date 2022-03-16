// 1. Initialize leaflet and center the city of Los Angeles

const coordenates = [34.052235, -118.243683]

var map = L.map("mapid").setView(coordenates, 10);

// 2. Add Layer from mapbox
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnJ1aml0YXJpIiwiYSI6ImNsMHR4czhqcTBiZmMzY3BlNHAxdzFrcm8ifQ.XMf2IiL6GLcwq1MrK7iyLA';

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_TOKEN,
  }

).addTo(map);


let numberOfMetros = 1





function getMetroUbis() {
  fetch('https://api.metro.net/vehicle_positions/bus?output_format=json')
    .then(response => response.json())
    .then(data => {
      console.log('pasa')
      data.entity.filter((e, i) => i < numberOfMetros).map(metro => {
        metrolat = metro.vehicle.position.latitude
        metrolong = metro.vehicle.position.longitude

        L.marker([metrolat, metrolong]).bindPopup('soy un metro :D').addTo(map)
        console.log(map)

        map.removeLayer(L)
      })


    });

  setTimeout(getMetroUbis, 5000);
}


getMetroUbis()
// 5. Create a code to refresh each 5 seconds and retrieve the new positions of the public transports
