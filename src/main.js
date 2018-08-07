// weather api call using ajax
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.ajax({
//       url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c49fc54dde82cf66d2795d8e9ce406ba`,
//       type: 'GET',
//       data: {
//         format: 'json'
//       },
//       success: function(response) {
//         $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//         $('.showTemp').text(`The temperature in Celcius is ${response.main.temp -273}.`);
//         $('.showFarenheit').text(`The temperature in Farenheit is ${(response.main.temp -273)*9/4 + 32}.`);
//       },
//       error: function() {
//         $('#errors').text("There was an error processing your request. Please try again.");
//       }
//     });
//   });
// });

// weather api call using jquery get and then. Get is shorthand ajax for get, then is jquery promise function
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//     $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`).then(function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }).fail(function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
//     });
//   });
// });

// weather api call using XMLHttpRequest
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//
//     let request = new XMLHttpRequest();
//     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
//     let getElements = function(response) {
//       $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//     }
//
//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         let response = JSON.parse(this.responseText);
//         getElements(response);
//       }
//     }
//
//     request.open("GET", url, true);
//     request.send();
//
//   });
// });

// weather api call using ES6 promise
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
