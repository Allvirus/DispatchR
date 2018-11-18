function getColorForStatus(status) {
    switch(status) {
        case 'New':
            return 'red';
            break;
        case 'Requested':
            return 'orange';
            break;
        case 'In Route':
            return 'blue';
            break;
        case 'Arrived':
            return 'green';
            break;
        default:
            return 'black';
    }
}

function getContentForStatus(status) {
    switch(status) {
        case 'New':
            return 'This location needs assistance. Click the <strong>Send for Help</strong> button below to get some help from a mobile user.';
            break;
        case 'Requested':
            return 'This location <strong>still</strong> needs attention. It has been requested previously but no one has accepted it yet.';
            break;
        case 'In Route':
            return 'Someone is on their way to this location.';
            break;
        case 'Arrived':
            return 'Someone has addressed this location already.';
            break;
        default:
            return 'black';
    }
}