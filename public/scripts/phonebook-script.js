// This code was heavily inspired from demo-ajax made by ROLAND François.

const REQUEST_TIMEOUT = 10000;

const phonebookTable = document.getElementById('phonebook-table');
const phonebookTableBody = phonebookTable.getElementsByTagName('tbody')[0];
const loadingAlert = document.getElementById('loading-alert');
const loadingSpinner = document.getElementById('loading-spinner');

function loadPhonebook(){
  phonebookTable.classList.add('d-none');
  loadingAlert.classList.add('d-none');
  loadingSpinner.classList.remove('d-none');

  const abortController = new AbortController();
  const timer = setTimeout(() => {
    abortController.abort();
  }, REQUEST_TIMEOUT);

  fetch('/api/phonebook', { signal: abortController.signal })
    .then((response) => response.json())
    .then((json) => {
      phonebookTableBody.innerHTML = '';
      const phonebook = json.phonebook;
      phonebook.forEach((entry) => {
        const row = document.createElement('tr');
        const lastNameCol = document.createElement('td');
        lastNameCol.textContent = entry.lastName;
        row.appendChild(lastNameCol);
        const firstNameCol = document.createElement('td');
        firstNameCol.textContent = entry.firstName;
        row.appendChild(firstNameCol);
        const birthDateCol = document.createElement('tr');
        birthDateCol.textContent = entry.birthDate;
        row.appendChild(birthDateCol);
        const phoneNumberCol = document.createElement('tr');
        phoneNumberCol.textContent = entry.phoneNumber;
        row.appendChild(phoneNumberCol);
        const emailAddressCol = document.createElement('tr');
        emailAddressCol.textContent = entry.emailAddress;
        row.appendChild(emailAddressCol);
        phonebookTableBody.appendChild(row);

      });
      phonebookTable.classList.remove('d-none');
    })
    .catch((error) => {
      loadingAlert.classList.remove('d-none');
      console.error(error);
    })
    .finally(() => {
      loadingSpinner.classList.add('d-none');
      clearTimeout(timer);
    })
}

loadPhonebook();

const entryForm = document.getElementById('entry-form');
const lastNameInput = document.getElementById('lastNameInput');
const firstNameInput = document.getElementById('firstNameInput');
const birthDateInput = document.getElementById('birthDateInput');
const phoneNumberInput = document.getElementById('phoneNumberInput');
const emailAddressInput = document.getElementById('emailAddressInput');
const sendingFailure = document.getElementById('sending-failure');

function sendForm(){
  lastNameInput.setAttribute('disabled', true);
  firstNameInput.setAttribute('disabled', true);
  birthDateInput.setAttribute('disabled', true);
  phoneNumberInput.setAttribute('disabled', true);
  emailAddressInput.setAttribute('disabled', true);

  const data = {
    lastName: lastNameInput.value,
    firstNameInput: firstNameInput.value,
    birthDateInput: birthDateInput.value,
    phoneNumberInput: phoneNumberInput.value,
    emailAddressInput: emailAddressInput.value,
  };

  const abortController = new AbortController();
  const timer = setTimeout(() => {
    abortController.abort();
  }, REQUEST_TIMEOUT);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  fetch('/api/phonebook', {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
    signal: abortController.signal,
  })
    .then((response) => {
      if(response.ok) {
        loadPhonebook();
        entryForm.reset();
        entryForm.classList.remove('was-validated');
        window.scrollTo(0, 0);
      }
    })
    .catch((error) => {
      sendingFailure.classList.remove('d-none');
    })
    .finally(() => {
      lastNameInput.removeAttribute('disabled');
      firstNameInput.removeAttribute('disabled');
      birthDateInput.removeAttribute('disabled');
      phoneNumberInput.removeAttribute('disabled');
      emailAddressInput.removeAttribute('disabled');
      clearTimeout(timer);
    });
}

entryForm.addEventListener('submit', (event) => {
  sendingFailure.classList.add('d-none');
  event.preventDefault();
  event.stopPropagation();
  if(entryForm.checkValidity()) {
    sendForm();
  }

  entryForm.classList.add('was-validated');
});

loadPhonebook();
