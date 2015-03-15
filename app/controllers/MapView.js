var args = arguments[0] || {};

/* map clicked */
$.mapview.addEventListener('click', mapAnnotationClicked);


// get the photo object from the parameters
var coords = args.item.custom_fields.coordinates[0];
var locationString = args.item.custom_fields.location_address;

// create annotation
var annotation = Alloy.Globals.Map.createAnnotation({
  latitude : Number(coords[1]),
  longitude : Number(coords[0]),
  title : args.item.custom_fields.location_string,
  myid : args.item.id
});

// add them to map
$.mapview.setAnnotations([annotation]);

// set the region around the photo
$.mapview.setRegion({
  latitude : annotation.latitude,
  longitude : annotation.longitude,
  latitudeDelta : 0.010,
  longitudeDelta : 0.010
});


function mapAnnotationClicked(_event) {
  // get event properties
  var annotation = _event.annotation;
  //get the Myid from annotation
  var clickSource = _event.clicksource;

  var showDetails = false;

  if (OS_IOS) {
    showDetails = (clickSource === 'rightButton');
  } else {
    showDetails = (clickSource === 'subtitle' || clickSource === 'title');
  }

  if (showDetails) {

    Ti.API.info('clickSource ' + clickSource);
  } else {
    Ti.API.info('clickSource ' + clickSource);
  }
};