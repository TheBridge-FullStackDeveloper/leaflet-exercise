// 1. Initialize leaflet and center the city of Los Angeles
var map = L.map("mapid").setView(/* Coordinates goes here */, 10);

// 2. Add Layer from mapbox
const MAPBOX_TOKEN = '';

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

// 3. By using the metro API make a fetch to retrieve the data

// 4. Display in your map the public transports
L.marker(/* Marker's coordinates */).bindPopup(/* Marker Text*/).addTo(map);

// 5. Create a code to refresh each 5 seconds and retrieve the new positions of the public transports
