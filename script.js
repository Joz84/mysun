const infoText1 = (expo_percent, protect_percent) => {
  return `
  <h5>1. Aujourd’hui</h5>
  <p>${expo_percent}% des personnes qui ont le même profil que moi s’exposent au soleil aux heures les plus
  chaudes de la journée.<br>
  ${protect_percent}% réappliquent un produit solaire toutes les 2 heures</p>
  <small><i>Etude ALL partie solaires Pierre Fabre 50 000 répondants de 20 pays
  (donner résultat du pays quand dispo dans la liste, moyenne si pays hors liste).</i></small>
`};

const infoText2 = (sun_percent) => {
  return `
  <h5>2. Et demain ?</h5>
  <p>Dans mon pays, dans 15 ans, je recevrai ${sun_percent}% de soleil en plus</p>
  <small><i>Estimation basée sur calcul évolution couche d’ozone, concentration vapeur d’eau… source
  GIEC Intergovernmental Panel on Climate Change 2022.</i></small>
`};

const infoText3 = (photoaging_percent) => {
  return `
  <h5>3. Combien d'année en plus pour ma peau ?</h5>
  <p>Cet ensoleillement peut déclencher ${photoaging_percent}% d’accentuation du vieillissement de ma peau</p>
  <small><i>Basé sur l’estimation de l’augmentation du taux d’UV et de lumière bleue et sur la
  façon dont je me protège actuellement.<br>
  Le % d’accentuation correspond à l’augmentation du vieillissement de la peau lié à
  mon exposition au soleil comparé au vieillissement de ma peau si je ne m’expose
  pas.</i></small>
`};

const infoText4 = (cancer_percent) => {
  return `
  <h5>4. Et le cancer de la peau dans tout ça ?</h5>
  <p>Le risque de développer un cancer cutané pour les personnes qui ont le même profil que moi aura augmenté de ${cancer_percent}%</p>
  <small><i>Cf data source globocan.</i></small>
`};

const recosText5 = (low_expo, protect, best_percent) => {
  if (low_expo & protect) {
    return `
      T'es au top! Change rien!
    `
  } else if (protect) {
    return `
    Si j’applique une crème solaire lorsque je suis exposé, 
    je réduis le risque d’accentuation du vieillissement cutané de ${best_percent}%
    `
  } else if (low_expo) {
    return `
    Si je m’expose moins, je le réduis de ${best_percent}%
    `
  } else {
    return `Je m’expose moins, j’applique une crème solaire lorsque je suis exposé et je la réapplique
    toutes les 2 heures : 
    je le réduis de ${best_percent}%`
  }
}

const infoText5 = (recosText) => {
  return `
  <h5>5. Alors... Toujours pas capté ?</h5>
  <p>
  Que ce soit parce que je veux prévenir le vieillissement cutané ou les risques de cancers de
  la peau :
    <ul>
      <li>je me protège même quand je ne suis pas à la plage !</li>
      <li>J’évite les heures les plus chaudes</li>
      <li>Je réapplique un produit solaire toutes les 2 heures</li>
      <li>Si je ne peux éviter le soleil, je peux aussi mettre un chapeau, un t shirt etc…</li>
    </ul>
  </p>
  <p>${recosText}</p>
  <small><i>Cf data source globocan.</i></small>
`};

const phototypes = {
  "I & II": "bg-I-II",
  "III & IV": "bg-III-IV",
  "V & VI": "bg-V-VI"
}

const ageSlot = (age) => {
  if (age >= 60) {
    return "70";
  } else if (age >= 40) {
    return "50";
  } else if (age >= 20) {
    return "30";
  } else if (age >= 0) {
    return "15";
  }
}

const generateAvatar = (persona) => {
  const phototype = persona["phototype"];
  const sex = persona["sex"];
  const age = persona["age"];
  const country = persona["country"];
  const avatar = document.getElementById("avatar");
  avatar.classList.remove("d-none");
  Object.values(phototypes).forEach(cls => avatar.classList.remove(cls));
  avatar.classList.add(phototypes[phototype]);
  avatar.querySelector('.avatar-body').src = `data/avatars/${sex}-${ageSlot(age)}.png`;

  fetch('https://raw.githubusercontent.com/Joz84/mysun/refs/heads/master/flags.json')
  .then(response => response.json()) 
  .then(data => {
    avatar.querySelector('.avatar-flag').src = `https://www.countryflags.com/wp-content/uploads/${data["countries"][country]}-flag-png-large.png`;
  })
  .catch(error => console.error('Erreur lors du chargement du JSON:', error));
}

const generateVignettes = (persona, simulation) => {

  const infoTexts = [
    infoText1(simulation["expo_percent"], simulation["protect_percent"]), 
    infoText2(simulation["sun_percent"]), 
    infoText3(simulation["photoaging_percent"]), 
    infoText4(simulation["cancer_percent"]), 
    infoText5(recosText5(persona["low_expo"], persona["protect"], simulation["best_percent"]))
  ];

  const vignettes = document.querySelectorAll('.vignette');
  vignettes.forEach((vignette, index) => {
    setTimeout(() => {
        vignette.classList.remove("d-none");
        vignette.querySelector(".card-body").innerHTML = infoTexts[index];
      }, index * 1000);
  });
}

function showVignettes() {
  const persona = {}
  persona["country"] = document.querySelector('.select-box > .selected-text').textContent.trim();
  persona["age"] = Number(document.getElementById('ageInput').value.trim());
  persona["sex"] = document.getElementById('sexInput').value.trim(); 
  persona["phototype"] = document.querySelector('.phototype.selected')?.textContent.trim() || "Non spécifié";
  persona["low_expo"] = document.getElementById('expoInput').value.trim() === "true";
  persona["protect"] = document.getElementById('protectInput').value.trim() === "true";
  
  generateAvatar(persona);
  const simulation = simulator(persona);
  generateVignettes(persona, simulation);
}


