// will use this for promises the same way we did in Ionic
var Q = require('q');

// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Cloud
// make sure you add the module in tiapp.xml
var Cloud = require('ti.cloud');

/**
 * function to log user into the system. Be sure to create the user in the admin console
 * first - https://my.appcelerator.com/apps
 *
 * @param {Function} _callback - called when login process has a return value
 */
function login(_callback) {
	var errorMessage;
	var user;

	// THIS SHOULD BE THE DEFAULT USERS YOU ALREADY CREATED FOR THE
	// APPLICATION. Look at chapter 2, page 37 for additional information
	Cloud.Users.login({
		login : 'myadminuser',
		password : 'password123'
	}, function(e) {
		if (e.success) {
			user = e.users[0];
			alert('Success:\n' + 'id: ' + user.id +  '\n' + 'user name: ' + user.username);
		} else {
			user = null;
			errorMessage = ((e.error && e.message) || JSON.stringify(e));
			alert('Error:\n' + errorMessage);
		}

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

				// now save the photo
				savePhoto(event.media);

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
 */
function savePhoto(_imageData) {
	Cloud.Photos.create({
		photo : _imageData
	}, function(e) {
		if (e.success) {
			var photo = e.photos[0];
			alert('Success:\n' + 'id: ' + photo.id + '\n' + 'filename: ' + photo.filename + '\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
		} else {
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

