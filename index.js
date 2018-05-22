const URL = 'https://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};

const FORM_FIELDS = ['name', 'age', 'owner'];
const inputField = name => $(`#pet-form input[name="${name}"]`); // one line arrow function

const readFormData = () => {
  const getInput = name => {
    const input = inputField(name).val();
    return input ? input : undefined;
  };

  const formData = {};
  FORM_FIELDS.forEach((field) =>{
    formData[field] = getInput(field);
  });
  return formData;
};

const clearForm = () => {
  FORM_FIELDS.forEach((field) => {
    inputField(field).val('');
  });
};

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

  reportStatus('Loading Pets!  Please Wait...');

  axios.get(URL)
    .then((response) => {
      console.log('inside the .then');
      response.data.forEach((animal) => {
        console.log(animal);
        petList.append(`<li>${animal.name}</li>`);
      });
      reportStatus('Pets Loaded!');
    })
    .catch((error) => {
      console.log(error);
      reportStatus(`Error: ${error.message }`);
    });

  console.log('This is after .get');
};

const createPet = (event) => {
  // Note that createPet is a handler for a `submit`
  // event, which means we need to call `preventDefault`
  // to avoid a page reload
  event.preventDefault();
  // from the form (aka the stuff on the HTML, figure out what the new pet should look like.

  let petData = readFormData(); // new verson. See below.

  // ORIGINAL VERSION
  // let petData = {};
  // petData['name'] = $(`input[name="name"]`).val();
  // petData['age'] = $(`input[name="age"]`).val();
  // petData['owner'] = $(`input[name="owner"]`).val();
  // console.log(petData);

  // make a POST request to the Pets API
  // make sure it's the right endpoint
  // with the right data
  axios.post(URL, petData)
    .then((response) => {
      // console.log(response);
      reportStatus(`Successfully added a pet with ID ${response.data.id}!`);
      clearForm();
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data && error.response.data.errors) {
        reportError(
          `Encountered an error: ${error.message}`,
          error.response.data.errors
        );
      } else {
        reportStatus(`Encountered an error: ${error.message}`);
      }
    });

  // Display any feedback we want to give to the user
  clearForm();
};

$(document).ready(() => {
  $('#load').click(loadPets);
  $('#pet-form').submit(createPet);
});