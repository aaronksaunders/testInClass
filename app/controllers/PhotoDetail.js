	// arguments from initializing the controller, arg.items
// holds the information on the selected image
var args = arguments[0] || {};

// set the image view to the proper URL
$.imageView.image = args.item.urls.medium_500 || args.item.urls.hd;

// location information
$.locationInfo.text = args.item.custom_fields.location_address;

// free the model-view data binding resources when this
// view-controller closes
$.detailWindow.addEventListener("close", function() {
	$.destroy();
});

function showMap() {
	// create the new controller and pass in the
	// model object as an argument 'item'
	var ctrl = Alloy.createController('MapView', {
		'item' : args.item
	});

	setTimeout(function() {
		args.photoListTab.open(ctrl.mainWindow);
	}, 200);
}
