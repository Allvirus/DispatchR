function getPoints() {
    axios
        .get(urlBase + '/places')
        .then(function (response) {
            console.log(response.data);
            for(i=0; i<response.data.length; i++) {
                var pushpin = new Microsoft.Maps.Pushpin(
                    {
                        latitude: response.data[i].latitude,
                        longitude: response.data[i].longitude
                    }, 
                    { 
                        color: getColorForStatus(response.data[i].status) 
                    });

                pushpin.metadata = {
                    title: response.data[i].name,
                    placeId: response.data[i].id,
                    status: response.data[i].status
                };

                Microsoft.Maps.Events.addHandler(pushpin, 'click', function (args) 
                {
                    console.log(args.target);
                    $('#sendHelpButton').data('placeId', args.target.metadata.placeId)
                    $('#exampleModalLabel').text(args.target.metadata.title);
                    
                    if(args.target.metadata.status != 'New' 
                        && args.target.metadata.status != 'Requested')
                        $('#sendHelpButton').hide();
                    else
                        $('#sendHelpButton').show();

                    $('#locationDialog').html(getContentForStatus(args.target.metadata.status));

                    $('#mapClickedModal').modal('toggle');
                });

                map.entities.push(pushpin);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function sendForHelp(e) {
    console.log("requesting help at: " + $(e).data('placeId'));
    connection
        .invoke("RequestAssistance", $(e).data('placeId'))
        .catch(function (err) {
            return console.error(err.toString());
        });
}