// will use this for promises the same way we did in Ionic
var Q = require('q');

// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Cloud
// make sure you add the module in tiapp.xml
var Cloud = require('ti.cloud');

var utils = require('utilities');

/**
 * function to log user into the system. Be sure to create the user in the admin console
 * first - https://my.appcelerator.com/apps
 *
 * @param {Function} _callback - called when login process has a return value
 */
function login(_callback) {
	var errorMessage;
	var user;

	utils.showIndicator();

	// THIS SHOULD BE THE DEFAULT USERS YOU ALREADY CREATED FOR THE
	// APPLICATION. Look at chapter 2, page 37 for additional information
	Cloud.Users.login({
		login : 'myadminuser',
		password : 'password123'
	}, function(e) {
		if (e.success) {
			user = e.users[0];
			alert('Success:\n' + 'id: ' + user.id + '\n' + 'user name: ' + user.username);
		} else {
			user = null;
			errorMessage = ((e.error && e.message) || JSON.stringify(e));
			alert('Error:\n' + errorMessage);
		}

		utils.hideIndicator();

		// done processing login, return from function with new result information
		_callback({
			success : (user !== null),
			user : user,
			message : errorMessage
		});
	});
}

/**
 * http://docs.appcelerator.com/titanium/3.0/#!/guide/Camera_and_Photo_Gallery_APIs
 */
function takePhoto() {
	Titanium.Media.showCamera({
		success : function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

				// get user location for the photo

				utils.getCurrentLocation().then(function(_results) {
					Ti.API.info('_results ' + JSON.stringify(_results, null, 2));
					return utils.reverseGeocoder(_results.location.latitude, _results.location.longitude);
				}).then(function(_locationAndTitle) {
					Ti.API.info('_locationAndTitle: ' + JSON.stringify(_locationAndTitle, null, 2));
					// now save the photo
					savePhoto(event.media, _locationAndTitle);
				}, function(_error) {
					Ti.API.info('_error ' + JSON.stringify(_error));
					// now save the photo with no location
					savePhoto(event.media, {});
				});

			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			if (error.code == Titanium.Media.NO_CAMERA) {
				alert('Please run this test on device');
			} else {
				alert('Unexpected error: ' + error.code);
			}
		},
		saveToPhotoGallery : true,
		// allowEditing and mediaTypes are iOS-only settings
		allowEditing : true,
		// only photo, no videos in this sample
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

/**
 * http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Cloud.Photos
 *
 * @param {Object} _imageData
 * @param {Object} _locationInformation
 */
function savePhoto(_imageData, _locationInformation) {

	utils.showindicator();

	var photoParameters = {
		photo : _imageData,
		// set some sizes for the photos
		"photo_sizes[preview]" : "200x200#",
		"photo_sizes[normal]" : "320x320#",
		// hi-density
		"photo_sizes[hd]" : "640x640#",
		// We need this since we are showing the image immediately
		"photo_sync_sizes[]" : "preview"

	};

	// if we got a location, then set them as custom fields
	if (_locationInformation) {
		photoParameters.custom_fields = {
			coordinates : [_locationInformation.location.longitude, _locationInformation.location.latitude],
			location_string : _locationInformation.title,
			location_address : _locationInformation.address
		};
	}

	Cloud.Photos.create(photoParameters, function(e) {
		if (e.success) {
			var photo = e.photos[0];

			utils.hideIndicator();

			alert('Success: filename: ' + photo.filename + '\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);

			// we have a new picture so update the view, load the
			// photos in the photoListView
			$.photoListView.loadImages();
		} else {
			utils.hideIndicator();
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

/**
 * this function is called when ACS has finished processing the login attempt.
 * the paramer _result will hold the Photos from ACS or the error message
 * will be set which is indicated by the _result.success === false
 *
 * @param {Object} _result
 */
function processingLoginResult(_result) {
	if (_result.success) {
		// load the photos in the photoListView
		$.photoListView.loadImages();
	} else {
		// did not login so do nothing...
	}
}

// open the main view of index.js, which is the tab
$.index.open();

// login to sample application
login(processingLoginResult);

utils.getCurrentLocation().then(function(_results) {
	Ti.API.info('_results ' + JSON.stringify(_results, null, 2));
	return utils.reverseGeocoder(_results.location.latitude, _results.location.longitude);
}).then(function(_results2) {
	Ti.API.info('_results after reverse geo ' + JSON.stringify(_results2, null, 2));
}, function(_error) {
	Ti.API.info('_error ' + JSON.stringify(_error));
});
