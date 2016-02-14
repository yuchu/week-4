/* =====================
  Lab 2, part3: a full application

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of global variables which track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application so as to filter
    using both minimum and maximum?
    There is a boolean field: can you write your code to filter according to this
    boolean? (Try to think about how you could chop your data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Try to see what you can produce.
===================== */

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */

var resetMap = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  _.each(myMarkers, function(marker) { map.removeLayer(marker); });
  myMarkers = [];
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var dataset = [];
var getAndParseData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  $.ajax("https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-crime-snippet.json").done(function(ajaxResponseValue){
    var parsed = JSON.parse(ajaxResponseValue);
    _.each(parsed, function(x){
      dataset.push(x);
    });
  });
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
  // Criteria 1: Numeric filter: District (1~39)
      // [1, 3, 6, 16, 18, 19, 22, 23, 24, 25, 26, 35, 39]
  // Criteria 2: String filter: General Crime Category
      //["Narcotic / Drug Law Violations", "All Other Offenses", "Thefts", "Other Assaults", "Rape", "Other Sex Offenses (Not Commercialized)", "Aggravated Assault No Firearm", "Theft from Vehicle", "Vandalism/Criminal Mischief", "DRIVING UNDER THE INFLUENCE", "Motor Vehicle Theft", "Burglary Residential", "Fraud", "Burglary Non-Residential", "Embezzlement", "Forgery and Counterfeiting", "Aggravated Assault Firearm", "Arson", "Robbery Firearm", "Disorderly Conduct", "Robbery No Firearm", "Homicide - Criminal", "Weapon Violations", "Liquor Law Violations", "Recovered Stolen Motor Vehicle", "Public Drunkenness", "Vagrancy/Loitering", "Offenses Against Family and Children", "Gambling Violations"]
  // Criteria 3: Boolean filter: AM or PM

  //Filter dataset: Create a list of "cleaned" filtered data
  var filtered = _.filter(dataset, function(data){
    return (_.isString(data.Coordinates)) // sort out dirty Coordinates
            & (data.District >= numericField1 & data.District <= numericField2) // Criteria 1
            & (data['General Crime Category'] == stringField) // Criteria 2
            & ((data['Dispatch Date/Time'].includes("PM")) === booleanField); //Criteria 3
  });

  //A function that make markers
  var makeMarkers = function(filtered) {
    return _.map(filtered, function(data){
            var split = data.Coordinates.split(", ");
            var Lat = parseFloat(split[0].split("(")[1]);
            var Lon = parseFloat(split[1].split(")")[0]);
            return L.marker([Lat,Lon]);
          });
  };

  //A function that plots markers
  var plotMarkers = function(marker){
    _.each(marker, function(x){x.addTo(map);});
  };

  //Call makeMarkers function & plotMarkers function
  myMarkers = makeMarkers(filtered);
  return plotMarkers(myMarkers);
};
