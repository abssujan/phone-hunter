// fetch data
const loadPhoneData = async (search, dataLimit) => {
    // Constructing the URL for fetching phone data based on the search term
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    
    // Fetching data from the API
    const res = await fetch(url);
    const data = await res.json();

    // Displaying the fetched phone data
    displayPhoneData(data.data, dataLimit);
};

// Display phone data on the HTML page
const displayPhoneData = (phones, dataLimit) => {
    console.log(phones);

    // Accessing the phone container in the HTML
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // Displaying a subset of phones or all phones based on dataLimit
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // Displaying a warning if no phones are found
    const warningDiv = document.getElementById('warning');
    if (phones.length === 0) {
        warningDiv.classList.remove('d-none');
    } else {
        warningDiv.classList.add('d-none');
    }

    // Creating HTML elements for each phone and appending them to the container
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button onclick="loadShowDetailsData('${phone.slug}')" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    // Toggling the spinner based on the loading state
    toggleSpinner(false);
};

// Process search input and trigger data loading
const processSearch = (dataLimit) => {
    // Toggling the spinner to indicate loading
    toggleSpinner(true);

    // Getting the search input value
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;

    // Loading phone data based on the search input
    loadPhoneData(inputValue, dataLimit);

    // Clearing the search input field
    // inputField.value = ``;  // Commented out, not sure if you want to clear the input field
};

// Adding a click event listener to the search button
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
});

// Adding a keypress event listener to the input field for Enter key
document.getElementById('input-field').addEventListener('keypress', function (e) {
    // Checking if the pressed key is Enter
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

// Toggle the visibility of the spinner
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
};

// Adding a click event listener to the "Show All" button
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
});

// Load and display detailed data for a specific phone
const loadShowDetailsData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayShowDetailsData(data.data);
};

// Display detailed data in a modal
const displayShowDetailsData = (phone) => {
    console.log(phone);

    // Updating the title of the modal
    const phoneTitle = document.getElementById('phoneModalLabel');
    phoneTitle.innerText = `${phone.name}`;

    // Updating the content of the modal with detailed information
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p><span class="fw-bold">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p><span class="fw-bold">Chip Set:</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No details found'}</p>
        <p><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No details found'}</p>
        <p><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No details found'}</p>
    `;
};
