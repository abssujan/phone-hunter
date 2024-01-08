// fetch data
const loadPhoneData = async(search) => {
    const url =`https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data)
}
const displayPhoneData = phones => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
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
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    })
}
document.getElementById('search-btn').addEventListener('click', function(){
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    loadPhoneData(inputValue)
    inputField.value = ``
})
loadPhoneData()