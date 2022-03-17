// 1. Initialize leaflet and center the city of Los Angeles
var map = L.map("mapid").setView([34.052235, -118.243683], 10);

// 2. Add Layer from mapbox
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ3VzdGF2b2phZW4iLCJhIjoiY2wwdHV2b2ZhMDA2NzNibnR0bTVoY2lhdiJ9.rReBQRDykoERaHdRReqgiw';

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

// Icon

let greenIcon = L.icon({
  iconUrl: './bus.jpg ',

  iconSize:     [50 , 50], // size of the icon
  iconAnchor:   [0, 55], // point of the icon which will correspond to marker's location
  popupAnchor:  [25, -44] // point from which the popup should open relative to the iconAnchor
});

// 3. By using the metro API make a fetch to retrieve the data


  
let markerArray = []


  
fetch('https://api.metro.net/vehicle_positions/bus?output_format=json')
.then(response => response.json())
.then(data => {

  return vehicles =  data.entity.filter((number, index, array)=>{
    
      if(index<10){
        console.log(number)
        let lat = number.vehicle.position.latitude
        let lon = number.vehicle.position.longitude
        let id = number.vehicle.vehicle.id
        let transport =
        markerArray.push(L.marker([lat, lon], {icon: greenIcon}).bindPopup(id).addTo(map));
        let group = L.featureGroup(markerArray).addTo(map);
        map.fitBounds(group.getBounds());
      }
     
    })
  
  });

// 5. Create a code to refresh each 5 seconds and retrieve the new positions of the public transports
setInterval(() => {
  fetch('https://api.metro.net/vehicle_positions/bus?output_format=json')
  .then(response => response.json())
  .then(data => {

    return vehicles =  data.entity.filter((number, index, array)=>{
      
        if(index<10){
          let lat = number.vehicle.position.latitude
          let lng = number.vehicle.position.longitude
          var newLatLng = new L.LatLng(lat, lng);
          markerArray[index].setLatLng(newLatLng);
          console.log(markerArray[index])
        }
      
      })
    
    });
  }, 10000);
clearInterval()



