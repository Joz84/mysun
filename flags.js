////////////// PAYS ////////////// 
// Générer le menu déroulant des pays avec les drapeaux
fetch('https://raw.githubusercontent.com/Joz84/mysun/refs/heads/master/flags.json')
.then(response => response.json()) 
.then(data => {
  const countriesDropdown = document.getElementById('countriesDropdown');
  for (const [country, flagUrl] of Object.entries(data["countries"])) {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.setAttribute('data-country', country);
  
    // Ajouter l'image du drapeau et le nom du pays
    optionDiv.innerHTML = `<img src="https://www.countryflags.com/wp-content/uploads/${flagUrl}-flag-png-large.png" alt="${country}" class="flag-icon"> ${country}`;
    
    // Ajouter un événement pour la sélection
    optionDiv.onclick = function() {
      selectCountry(country, flagUrl);
    };
    countriesDropdown.appendChild(optionDiv);
  }
})
.catch(error => console.error('Erreur lors du chargement du JSON:', error));


// Fonction pour afficher/masquer les options du menu déroulant
function toggleOptions() {
  const options = document.getElementById('countriesDropdown');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
  // Lorsque le menu est affiché, montrer la barre de recherche
  document.getElementById('searchInput').style.display = 'block';
}

// Fonction pour sélectionner un pays
function selectCountry(country, flagUrl) {
  const selectBox = document.querySelector('.select-box');
  selectBox.querySelector('.selected-text').textContent = country;
  toggleOptions(); // Fermer la liste des options et la recherche
  document.getElementById('searchInput').style.display = 'none'; // Masquer la barre de recherche
}

// Fonction pour filtrer les pays en fonction de la recherche
function filterCountries() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const options = document.querySelectorAll('.option');
  
  options.forEach(option => {
    const countryName = option.textContent.toLowerCase();
    if (countryName.indexOf(searchQuery) !== -1) {
      option.style.display = 'flex'; // Afficher l'option
    } else {
      option.style.display = 'none'; // Cacher l'option
    }
  });
}