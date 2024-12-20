
const loadPhone = async (searchText,isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  const showAllConatiner = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllConatiner.classList.remove('hidden');
  } else {
    showAllConatiner.classList.add('hidden');
  }
  // console.log('show al ', isShowAll);
  if(!isShowAll){
    phones = phones.slice(0, 12);
    
  }
    
  
  phones.forEach(phone => {
    // console.log(phone);
    // Create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-200  shadow-xl`;
    phoneCard.innerHTML = `
          <figure>
            <img
              src="${phone.image}"
              alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Brand: ${phone.brand}</p>

            <div class="card-actions justify-centre">
              <button onclick="handleShowDetails('${phone.slug}');
              show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
          </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loadiing spinner
  loadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById('Search-field');
  const searchText = searchField.value;

  // console.log(searchText);
  loadPhone(searchText, isShowAll);
}
const loadingSpinner = (isLoading) => {
  const loadingSpinnerContainer = document.getElementById('loading-spinner');
  if(isLoading ){
    loadingSpinnerContainer.classList.remove('hidden');
  }
  else{
    loadingSpinnerContainer.classList.add('hidden');
  }
  
}

const handleShowAll = (isShowAll) => {
  handleSearch(true);
}

// handle show details button
const handleShowDetails = async (id) => {
  console.log('show details',id);
  // load sigle phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}

// handle show phone details 
const showPhoneDetails = (phone) => {
  const modal = document.getElementById('show_details_modal');
  const spinner = document.getElementById('spinner');
  const modalContainer = document.getElementById('modal-container');

  // Show spinner and hide content initially
  spinner.classList.remove('hidden');
  modalContainer.classList.add('hidden');

  // Simulate loading time with setTimeout (replace with actual API call if necessary)
  setTimeout(() => {
    // Populate modal with phone details
    modalContainer.innerHTML = `
      <img src="${phone.image}" alt="Phone Image" class="w-full h-auto mb-4">
      <h3 id="show-details-name" class="text-lg font-bold mb-2">${phone.name}</h3>
      <p><strong>Brand:</strong> ${phone.brand}</p>
      <p><strong>Release Date:</strong> ${phone.releaseDate}</p>
      <p><strong>Chipset:</strong> ${phone.mainFeatures?.chipSet || 'N/A'}</p>
      <p><strong>Display Size:</strong> ${phone.mainFeatures?.displaySize || 'N/A'}</p>
      <p><strong>Memory:</strong> ${phone.mainFeatures?.memory || 'N/A'}</p>
      <p><strong>Storage:</strong> ${phone.mainFeatures?.storage || 'N/A'}</p>
      <p><strong>Sensors:</strong> ${phone.mainFeatures?.sensors?.join(', ') || 'N/A'}</p>
      <div class="mt-4">
        <h4 class="font-bold">Other Features:</h4>
        <ul>
          ${Object.entries(phone.others || {}).map(
            ([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`
          ).join('')}
        </ul>
      </div>
    `;

    // Hide spinner and show content
    spinner.classList.add('hidden');
    modalContainer.classList.remove('hidden');
  }, 1000); // Simulated delay

  // Show the modal
  modal.showModal();
};

const samplePhone = {
  brand: "Apple",
  image: "https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series-7-aluminum.jpg",
  name: "Watch Series 7 Aluminum",
  releaseDate: "Released 2021, October 15",
  mainFeatures: {
    chipSet: "Apple S7",
    displaySize: "1.9 inches",
    memory: "32GB",
    sensors: [
      "Accelerometer",
      "gyro",
      "heart rate",
      "barometer",
      "always-on altimeter",
      "compass",
      "SpO2",
      "VO2max",
    ],
    storage: "32GB storage, no card slot",
  },
  others: {
    WLAN: "Wi-Fi 802.11 b/g/n, dual-band",
    Bluetooth: "5.0, A2DP, LE",
    GPS: "Yes, with A-GPS, GLONASS, GALILEO, QZSS, BDS",
    NFC: "Yes",
    Radio: "No",
  },
};

// showPhoneDetails(samplePhone);



// loadPhone();
