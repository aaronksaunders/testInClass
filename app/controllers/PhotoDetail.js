// arguments from initializing the controller, arg.items
// holds the information on the selected image
var args = arguments[0] || {};

// set the image view to the proper URL
$.imageView.image = args.item.urls.medium_500 || args.item.urls.hd;

// location information
if (args.item.custom_fields) {
	$.locationInfo.text = args.item.custom_fields.location_address;
} else {
	$.locationInfo.text = "Missing Location Information";
}

// free the model-view data binding resources when this
// view-controller closes
$.detailWindow.addEventListener("close", function() {
	$.destroy();
});

function closeWindow() {
	$.detailWindow.close();
}


function showMap() {
	// create the new controller and pass in the
	// model object as an argument 'item'
	var ctrl = Alloy.createController('MapView', {
		'item' : args.item
	});

	setTimeout(function() {
		args.photoListTab.open(ctrl.mapWindow);
	}, 200);
}
