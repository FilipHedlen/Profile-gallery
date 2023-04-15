document.addEventListener("DOMContentLoaded", () => {
const profileDiv = document.querySelector(".profile-div");
const seeMoreBtn = document.getElementById("see-more-btn"); 
const genderDropdown = document.getElementById("gender-filter");


const limit = 20; // Limit of visible profiles when you enter the page = 20
let displayedProfiles = 0; // Keeping track of seen profiles
let filteredProfiles = null; // Start the filtering with null

fetch("https://randomuser.me/api/?results=200") // Fetching the data from API
  .then(response => response.json())
  .then(data => {
    filteredProfiles = data.results;
    displayProfiles(filteredProfiles.slice(0, limit)); // Display the first 20 profiles
    
    seeMoreBtn.addEventListener("click", () => {
      const remainingProfiles = filteredProfiles.slice(displayedProfiles, filteredProfiles.length); // Remaining profiles
      const nextProfiles = remainingProfiles.slice(0, limit);
      displayProfiles(nextProfiles);
    });

    genderDropdown.addEventListener("change", () => {
        const selectedGender = genderDropdown.value; // Selection of gender filtering
        displayedProfiles = 0;
        if (selectedGender === "all") {
          filteredProfiles = data.results; // If "All" is selected, set filteredProfiles to the original data from API
        } else {
          filteredProfiles = data.results.filter(user => user.gender === selectedGender); // Male or female
        }

        profileDiv.innerHTML = ""; // Clear the profile div
        displayProfiles(filteredProfiles.slice(0, limit)); // Display the first 20 filtered profiles
      });
  })
  .catch(error => {
    console.error(error);
  });

function displayProfiles(profiles) {
  profiles.forEach(user => {
    const profileCard = createProfileCard(user);
    profileDiv.appendChild(profileCard); // Add the profilecard to the profile div

    displayedProfiles++;
  });
}

function createProfileCard(user) {
  const profileCard = document.createElement("div"); // Add div for profile card

  profileCard.classList.add("profile-card"); // Classlist added for CSS purposes
  const profileHTML = `
    <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
    <h4>${user.name.title} ${user.name.first} ${user.name.last}</h4>
    <p>${user.dob.age} years old ${user.gender}, located in ${user.location.city}, ${user.location.country}</p>
    <p><strong>Contact information</strong><br> ${user.email}<br> ${user.cell}</p>
  `;
  // Set the profile card's innerHTML to the generated HTML
  profileCard.innerHTML = profileHTML;
  return profileCard;
}
});