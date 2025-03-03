function showVignettes() {

  const infoText6 = `Alors….Toujours pas capté ?
      Que ce soit parce que je veux prévenir le vieillissement cutané ou les risques de cancers de la peau, je me protège même quand je ne suis pas à la plage !
      J’évite les heures les plus chaudes
      Je réapplique un produit solaire toutes les 2 heures
      Si je ne peux éviter le soleil, je peux aussi mettre un chapeau, un t shirt etc…`

  const phototypes = {
    "I & II": "bg-I-II",
    "III & IV": "bg-III-IV",
    "V & VI": "bg-V-VI"
  }

  const vignettes = document.querySelectorAll('.vignette');
  const avatar = document.getElementById("avatar");

  const selectBox = document.querySelector('.select-box');
  const country = selectBox.querySelector('.selected-text').textContent.trim();

  const age = Number(document.getElementById('ageInput').value.trim());
  
  let ageSlot = null
  if (age >= 60) {
    ageSlot = "70";
  } else if (age >= 40) {
    ageSlot = "50";
  } else if (age >= 20) {
    ageSlot = "30";
  } else if (age >= 0) {
    ageSlot = "15";
  }
  
  const sex = document.getElementById('sexInput').value.trim(); 
  const phototype = document.querySelector('.phototype.selected')?.textContent.trim() || "Non spécifié";
  const infoText = `Pays: ${country}\nÂge: ${ageSlot}\nSexe: ${sex}\nPhototype: ${phototype}`;
  
  avatar.classList.remove("d-none");
  avatar.classList.remove("bg-I-II");
  avatar.classList.remove("bg-III-IV");
  avatar.classList.remove("bg-V-VI");
  avatar.classList.add(phototypes[phototype]);
  avatar.querySelector('.avatar-body').src = `data/avatars/${sex}-${ageSlot}.png`;

  fetch('https://raw.githubusercontent.com/Joz84/mysun/refs/heads/master/flags.json')
  .then(response => response.json()) 
  .then(data => {
    avatar.querySelector('.avatar-flag').src = `https://www.countryflags.com/wp-content/uploads/${data["countries"][country]}-flag-png-large.png`;
  })
  .catch(error => console.error('Erreur lors du chargement du JSON:', error));


  vignettes.forEach((vignette, index) => {
      setTimeout(() => {
          vignette.classList.remove("d-none");
          if (index === 0) vignette.querySelector(".card-body").textContent = infoText;
          if (index === 4) vignette.querySelector(".card-body").textContent = infoText6;
      }, index * 200);
  });
}

function selectPhototype(element) {
  document.querySelectorAll('.phototype').forEach(pt => pt.classList.remove('selected'));
  element.classList.add('selected');
}

////////////// AGE ////////////// 


////////////// GENRE ////////////// 
// Fonction pour sélectionner le sexe
function selectSex(card, sex) {
  let cards = document.querySelectorAll('.sex-card');
  cards.forEach(c => {
    c.classList.remove('selected');
  });
  card.classList.add('selected');
  document.getElementById('sexInput').value = sex;
}

////////////// EXPOSITION ////////////// 
// Fonction pour sélectionner l'exposition
function selectExpo(card, expo) {
  let cards = document.querySelectorAll('.expo-card');
  cards.forEach(c => {
    c.classList.remove('selected');
  });
  card.classList.add('selected');
  document.getElementById('expoInput').value = expo;
}

////////////// PROTECTION ////////////// 
// Fonction pour sélectionner le sexe
function selectProtect(card, protect) {
  let cards = document.querySelectorAll('.protect-card');
  cards.forEach(c => {
    c.classList.remove('selected');
  });
  card.classList.add('selected');
  document.getElementById('protectInput').value = protect;
}

////////////// Two Hours ////////////// 
// Fonction pour sélectionner le sexe
function selectTwoHours(card, twoHours) {
  let cards = document.querySelectorAll('.two-hours-card');
  cards.forEach(c => {
    c.classList.remove('selected');
  });
  card.classList.add('selected');
  document.getElementById('twoHoursInput').value = twoHours;
}


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