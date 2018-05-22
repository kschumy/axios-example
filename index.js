const places = [
  "Great Pyramid of Giza",
  "Hanging Gardens of Babylon",
  "Colossus of Rhodes",
  "Pharos of Alexandria",
  "Statue of Zeus at Olympia",
  "Temple of Artemis",
  "Mausoleum at Halicarnassus"
];

const buildURL = function (place) {
  let key = 'AIzaSyAI0-N0rLVgoKPsN-2pzUkRbQSticlDw8E';
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${key}`;
};

const getLocationFromResponse = (response) => {
  return response['data']['results'][0]['geometry']['location'];
};

const reportStatus = (message) => { $('#status-message').html(message); };

const loadWonders = () => {
  const wondersList = $('#wonder-list');
  wondersList.empty();

  reportStatus('Loading Wonders!  Please Wait...');
  places.forEach((place) => {
    axios.get(buildURL(place))
      .then((response) => {
        // console.log(response);
        let location = getLocationFromResponse(response);
        wondersList.append(`<li>${place} - ${location['lat']}, ${location['lng']} </li>`);
        reportStatus('Wonders Loaded!');
      })
      .catch((error) => {
        console.log(error);
        reportStatus(`Error: ${error.message }`);
      });
  });
};

$(document).ready(() => {
  $('#load').click(loadWonders);
});

// const URL = 'https://petdibs.herokuapp.com/pets';
//
// const reportStatus = (message) => {
//   $('#status-message').html(message);
// }
//
// const loadPets = () => {
//   const petList = $('#pet-list');
//   petList.empty();
//
//   reportStatus('Loading Pets!  Please Wait...');
//
//   // get the thing
//   axios.get(URL)
//     .then((response) => {
//       console.log('inside the .then');
//       response.data.forEach((animal) => {
//         console.log(animal);
//         petList.append(`<li>${animal.name}</li>`);
//       });
//       reportStatus('Pets Loaded!');
//     })
//     .catch((error) => {
//       console.log(error);
//       reportStatus(`Error: ${error.message }`);
//     });
//
//   console.log('This is after .get');
// }
//
// $(document).ready(() => {
//   $('#load').click(loadPets);
// })