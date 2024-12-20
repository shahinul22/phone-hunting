
const loadPhone = async (searchText, isShowAll) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    // If searchText is empty, show a message
    if (!searchText.trim()) {
      displayPhones([], isShowAll, "Please enter a search term.");
      return;
    }

    // Show appropriate message if no phones are found
    if (phones.length === 0) {
      displayPhones([], isShowAll, "No phones match your search query. Try something like iPhone, Samsung, or Oppo.");
      return;
    }

    // Display the fetched phones
    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("Error fetching data:", error);
    displayPhones([], isShowAll, "Something went wrong. Please try again later.");
  }
};


const displayPhones = (phones, isShowAll, message = "") => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = ""; // Clear previous results

  const showAllContainer = document.getElementById("show-all-container");

  // Show or hide "Show All" button
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // Display a message if no phones are available
  if (phones.length === 0) {
    phoneContainer.innerHTML = `<p class="text-center text-red-500">${message}</p>`;
    loadingSpinner(false);
    return; // Stop further execution
  }

  // Limit the display to the first 12 phones if not showing all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // Render each phone card
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-200 shadow-xl";
    phoneCard.innerHTML = `
      <figure>
        <img src="${phone.image}" alt="${phone.phone_name}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>Brand: ${phone.brand}</p>
        <div class="card-actions justify-center">
          <button onclick="handleShowDetails('${phone.slug}');" class="btn btn-primary">
            Show Details
          </button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  // Hide loading spinner
  loadingSpinner(false);
};



// handle search button
const handleSearch = (isShowAll = false) => {
  loadingSpinner(true);
  const searchField = document.getElementById("Search-field");
  const searchText = searchField.value.trim();
  loadPhone(searchText, isShowAll);
};

const loadingSpinner = (isLoading) => {
  const loadingSpinnerContainer = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinnerContainer.classList.remove("hidden"); // Show spinner
  } else {
    loadingSpinnerContainer.classList.add("hidden"); // Hide spinner
  }
};


const handleShowAll = () => {
  loadingSpinner(true);
  setTimeout(() => {
    handleSearch(true); // Show all phones
  }, 500); // Optional delay for a smoother experience
};


// handle show details button
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const modal = document.getElementById("show_details_modal");
  const spinner = document.getElementById("spinner");
  const modalContainer = document.getElementById("modal-container");

  // Show spinner while loading content
  spinner.classList.remove("hidden");
  modalContainer.classList.add("hidden");

  setTimeout(() => {
    modalContainer.innerHTML = `
      <img src="${phone.image}" alt="${phone.name}" class="w-full h-auto mb-4">
      <h3 id="show-details-name" class="text-lg font-bold mb-2">${phone.name}</h3>
      <p><strong>Brand:</strong> ${phone.brand}</p>
      <p><strong>Release Date:</strong> ${phone.releaseDate || "Not Available"}</p>
      <p><strong>Chipset:</strong> ${phone.mainFeatures?.chipSet || "N/A"}</p>
      <p><strong>Display Size:</strong> ${phone.mainFeatures?.displaySize || "N/A"}</p>
      <p><strong>Memory:</strong> ${phone.mainFeatures?.memory || "N/A"}</p>
      <p><strong>Storage:</strong> ${phone.mainFeatures?.storage || "N/A"}</p>
      <p><strong>Sensors:</strong> ${phone.mainFeatures?.sensors?.join(", ") || "N/A"}</p>
      <div class="mt-4">
        <h4 class="font-bold">Other Features:</h4>
        <ul>
          ${Object.entries(phone.others || {})
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join("")}
        </ul>
      </div>
    `;

    // Show content and hide spinner
    spinner.classList.add("hidden");
    modalContainer.classList.remove("hidden");
  }, 1000);

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
