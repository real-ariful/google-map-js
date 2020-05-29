
var map;
var markers = [];
var infoWindow;
function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 8,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

    });

    infoWindow = new google.maps.InfoWindow();
    searchStores();
}

function searchStores() {
  var foundStores = [];
  //Read the value
  var zipCode = document.getElementById('zip-code-input').value;
  console.log(zipCode);
  //Search for specific
  if (zipCode) {
      stores.forEach(function(store) {
          var postal = store.address.postalCode.substring(0,5);
          if(postal == zipCode){
              foundStores.push(store);            
          }        
      });        
  }
  else{
      foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener(foundStores);    

    

}

function clearLocations(){
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(null);      
  }
  markers.length = 0;

}
function setOnClickListener(stores){
  var storeElements =  document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
  elem.addEventListener('click', function(){
      google.maps.event.trigger(markers[index], 'click')
      })
  });
}

function displayStores(stores) {
    var storesHtml = "";
    stores.forEach(function(store, index){
        var address = store.addressLines;
        var phone = store.phoneNumber;
        storesHtml += `
            <div class="store-container">
              <div class="store-container-background">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
              </div>
            </div>
        `
    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
}


function showStoresMarkers(stores) {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        // console.log(latlng);
        var name = store.name;
        var address = store.addressLines[0];
        var status = store.openStatusText;
        var phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address,phone, status,index+1);
    })
    map.fitBounds(bounds);
}


function createMarker(latlng, name, address, phone, status, index) {
  var image_red = "images/hospital30.svg"
  var image_green = 'images/hos-green40.png';
  if (index%2 == 0) {
    custom_icon = image_red
    
  } else {
      custom_icon = image_green
      
      
  }
  latLngJson = latlng.toJSON()
  

  var lat = latLngJson.lat;
  var long = latLngJson.lng;
  //https://www.google.com/maps/dir/?api=1&destination=23.7709,90.3592
  var mapUrl = "https://www.google.com/maps/dir/?api=1&destination=" +lat+','+long;

  // console.log(mapUrl);
  // var html =`
  //         <div id="content">
  //             <div id="siteNotice"></div>
  //                 <h1 id="firstHeading" class="firstHeading">${name}</h1>

  //                     <div id="bodyContent">
  //                         <div class="window-status">${status}</div>
  //                         <div class="window-icons">
  //                             <div class="window-address">
  //                                     <i class="fas fa-compass"></i>
  //                                     <a href=${mapUrl} >${address}</a>                            
  //                             </div>
  //                             <div class="window-phone">
  //                                     <i class="fas fa-phone-square-alt"></i>
  //                                     ${phone}
  //                             </div>
  //                     </div>
  //                 </div>
  //         </div>                 
  // `;





    
    

    






    var html =`
            <div class="store-info-window">
              <div class="store-info-name">
                ${name}         
              </div>           
              <div class="store-info-status">
                ${status}       
              </div> 
              <div class="store-info-address">
                <div class="circle">
                  <i class="fas fa-location-arrow"></i> 
                </div href=${mapUrl}>
                <a href=${mapUrl} >${address}</a>    
              </div>          
              <div class="store-info-phone">
                <div class="circle">
                  <i class="fas fa-phone-alt"></i> 
                </div>
                ${phone}     
              </div>   
            </div>
                     
    `;


    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: `${index}`,
      icon: custom_icon,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);

    }





    function getLocation() {
        if (navigator.geolocation) {
          data = navigator.geolocation.getCurrentPosition(showPosition);
          return data;
        } else {
            alert('Geolocation is not supported by this browser.');
        }
      }
      
      function showPosition(position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          return lat,long;

       var data = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        alert(data);
      }