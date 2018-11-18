function showMyLocation() {
    // this is to simulate someone getting started at Building 25
    map.entities.push(new Microsoft.Maps.Pushpin(
        {
            latitude: 47.64520902121605,
            longitude: -122.13106830688477
        }, 
        { 
            color: 'black'
        }));
}

function acceptMisson(e) {
    console.log("accepted help at: " + $(e).data('placeId'));
}

connection.on("assistanceRequested", function (place) {
    console.log(place);

    var pushpin = new Microsoft.Maps.Pushpin(
        {
            latitude: place.latitude,
            longitude: place.longitude
        }, 
        { 
            color: getColorForStatus(place.status) 
        });

    pushpin.metadata = {
        title: place.name,
        placeId: place.id,
        status: place.status
    };

    map.setView({
        center: new Microsoft.Maps.Location(place.latitude, place.longitude),
    });

    map.entities.push(pushpin);

    Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) 
    {
        console.log(args.target);
        $('#acceptMission').data('placeId', args.target.metadata.placeId)
        $('#exampleModalLabel').text(args.target.metadata.title);
        $('#mapClickedModal').modal('toggle');
    });
});