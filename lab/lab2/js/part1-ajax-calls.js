/* =====================
  Lab 1, Part 1

  Writing a successful ajax call requires treating functions as values.
  Treated as a values, functions can be thought of as recipes that other
  functions can use.

  The first 'recipe' you should write is one that returns true for strings with
  greater than or equal to 5 characters and false for those shorter than 5 characters.

  This recipe, given to underscore's _.filter will return only the elements we want.
===================== */
var isLengthOfFiveOrMore = function(str) {
  if(str.length >= 5){
    return true;
  }
};

console.log("isLengthOfFiveOrMore success:",
  _.isEqual(_.filter(['this', 'is','a', 'test', 'testing'], isLengthOfFiveOrMore), ['testing']));


/* =====================
  Now write a 'recipe' to console.log the double of a number (i.e. n * 2). Use the
  function you write along with underscore's _.each to log the double of every
  number in the provided array.
===================== */
var logDouble = function(num) {
  return num * 2;
};
var theArray = [1, 5, 20, 100];

_.each(theArray, function(x){console.log(logDouble(x));});

/* =====================
  Given this already defined function, define fizzbuzzArray so that, when mapped
  over, it will equal ['fizz', 'buzz', 'fizzbuzz'];
===================== */
var fizzbuzzArray = [3,5,'fizzbuzz'];
var fizzbuzzFunc = function(num) {
  var str = '';
  if (num % 3 === 0) { str = 'fizz'; }
  if (num % 5 === 0) { str += 'buzz'; }
  if (str === '') { str = num.toString(); }
  return str;
};

console.log("fizzbuzz success:",
  _.isEqual(_.map(fizzbuzzArray, fizzbuzzFunc), ['fizz', 'buzz', 'fizzbuzz']));


/* =====================
  Writing ajax calls works very much like these higher order functions from
  underscore. Here's the ajax syntax:
  $.ajax(<URL GOES HERE>).done(<RECIPE GOES HERE>);

  Your job is to write functions and ajax calls for one of the three provided
  URLs to pull down and then store data collected through AJAX in variables so
  that you can work with it. To test your success, prove that you can log the
  resulting data to your console.

  You may choose whichever dataset you find most interesting.

  NOTE: Because the ajax call happens asynchronously (that is, outside the normal execution order),
        you'll need to call console.log *within* the function that grabs your data.
        For example:

        var computedValue;  // We want to store the value of a response on this variable

        // ================================
        // GOOD ===========================
        // ================================
        $.ajax(<URL>).done(function(ajaxResponseValue) {
          // a function that does some kind of transformation on the response
          var computedValue = doStuffHere(ajaxResponseValue);
          // Logging our computed result (within the body of the ajax function)
          console.log(computedValue);
        });

        // ================================
        // BAD ============================
        // ================================
        console.log(computedValue);

        The problem with logging here is that this will probably happen before that ajax call can
        return with a response. this will print before it has anything stored on its var!
        It will just log undefined to the console.

===================== */
var phillySolarInstallationDataUrl = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-solar-installations.json";
var phillyCrimeDataUrl = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-crime-snippet.json";
var phillyBikeCrashesDataUrl = "https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json";

$.ajax(phillyBikeCrashesDataUrl).done(function(ajaxResponseValue) {
  // a function that does some kind of transformation on the response
  var computedValue = JSON.parse(ajaxResponseValue);
  // Logging our computed result (within the body of the ajax function)
  console.log(computedValue);
});

/* =====================
  Data you grab through ajax is just text. You'll need to parse it as javascript
  objects to really work with it. Use the function JSON.parse on the string you
  downloaded for the exercise above to parse your strings as javascript objects.

  Remember to call all code within the function body. Use console.log to make sure
  that this step is completed before moving on!
===================== */


/* =====================
  Now that you've properly parsed your data, use _.each to plot the
  dataset you've pulled down.
===================== */
