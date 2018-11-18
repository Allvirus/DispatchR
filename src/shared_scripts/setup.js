var map;
const urlBase = 'http://localhost:3000';

function loadMap() {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {});
    map.setView({
        center: new Microsoft.Maps.Location(47.645050, -122.130210),
        zoom: 16
    });
    Microsoft.Maps.Events.addHandler(map, 'click', function (e) 
    { 
        console.log(e.location.latitude + ', ' + e.location.longitude);
    });
}

var connection = new signalR.HubConnectionBuilder().withUrl(urlBase + "/dispatchr").build();