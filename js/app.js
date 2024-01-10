// fetch data
const loadPhoneData = async(search, dataLimit) => {
    const url =`https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data, dataLimit)
}
const displayPhoneData = (phones, dataLimit) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display 10 phones
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        showAll.classList.remove('d-none')
    }else {
        showAll.classList.add('d-none')
    }
    // if phone not found
    const warnigDiv = document.getElementById('warning');
    if(phones.length === 0){
        warnigDiv.classList.remove('d-none')
    }else{
        warnigDiv.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
             <img src=" ${phone.image} " class="card-img-top w-75" alt="...">
            <div class="card-body">
                <h5 class="card-title"> ${phone.phone_name} </h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             </div>
             <button onclick="loadShowDetailsData('${phone.slug}')" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    })
    toggleSpiner(false)
}
const porcecerSearch = (dataLimit) => {
    toggleSpiner(true)
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    loadPhoneData(inputValue, dataLimit)
    //inputField.value = ``
}

document.getElementById('search-btn').addEventListener('click', function(){
    porcecerSearch(10)
})
// enter event
document.getElementById('input-field').addEventListener('keypress', function (e) {
    console.log(e)
    if (e.key === 'Enter') {
        porcecerSearch(10)
    }
});

const toggleSpiner = (isLoading) => {
    const loderSection = document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove('d-none')
    }else {
        loderSection.classList.add('d-none')
    }
}
document.getElementById('show-all-btn').addEventListener('click', function(){
    porcecerSearch()
})
const loadShowDetailsData = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayShowDetailsData(data.data)

}

const displayShowDetailsData = phone => {
    console.log(phone)
    const phoneTitle = document.getElementById('phoneModalLabel');
    phoneTitle.innerText = `${phone.name}`;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p><span class="fw-bold">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'No release date found'} </p>
    <p><span class="fw-bold">Chip Set:</span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No details found'} </p>
    <p><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No details found'}</p>
    <p><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No details found'}</p>
    `
}