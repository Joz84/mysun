const infoText1 = (expo_percent, protect_percent) => {
  console.log("--------------------");
  console.log(expo_percent, protect_percent);
  console.log("--------------------");
  return `
  <h5>1. Aujourd’hui</h5>
  <p><b>${expo_percent.toFixed(2)}%</b> des personnes qui ont le même profil que moi s’exposent au soleil aux heures les plus
  chaudes de la journée.<br>
  <b>${protect_percent.toFixed(2)}%</b> réappliquent un produit solaire toutes les 2 heures</p>
  <small><i>Etude ALL partie solaires Pierre Fabre 50 000 répondants de 20 pays
  (donner résultat du pays quand dispo dans la liste, moyenne si pays hors liste).</i></small>
`};

const infoText2 = (sun_percent) => {
  return `
  <h5>2. Et demain ?</h5>
  <p>Dans mon pays, dans 15 ans, je recevrai <b>${sun_percent.toFixed(2)}%</b> de soleil en plus</p>
  <small><i>Estimation basée sur calcul évolution couche d’ozone, concentration vapeur d’eau… source
  GIEC Intergovernmental Panel on Climate Change 2022.</i></small>
`};

const infoText3 = (photoaging_percent, photoaging_delta) => {
  return `
  <h5>3. Combien d'année en plus pour ma peau ?</h5>
  <p>Cet ensoleillement peut déclencher <b>${photoaging_percent.toFixed(2)}%</b> d’accentuation du vieillissement de ma peau</p>
  <p>Soit <b>${photoaging_delta.toFixed(2)}</b> années en plus pour ma peau</p> 
  <small><i>Basé sur l’estimation de l’augmentation du taux d’UV et de lumière bleue et sur la
  façon dont je me protège actuellement.<br>
  Le % d’accentuation correspond à l’augmentation du vieillissement de la peau lié à
  mon exposition au soleil comparé au vieillissement de ma peau si je ne m’expose
  pas.</i></small>
`};

const infoText4 = (cancer_percent) => {
  return `
  <h5>4. Et le cancer de la peau dans tout ça ?</h5>
  <p>Le risque de développer un cancer cutané pour les personnes qui ont le même profil que moi aura augmenté de <b>${cancer_percent.toFixed(2)}%</b></p>
  <small><i>Cf data source globocan.</i></small>
`};

const recosText5 = (photoaging_percent) => {
  if (photoaging_percent == 0) {
    return `
      T'es au top! Change rien!
    `
  } else {
    return `Je m’expose moins, j’applique une crème solaire lorsque je suis exposé et je la réapplique
    toutes les 2 heures : 
    je le réduis de <b>${photoaging_percent.toFixed(2)}%</b>`
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
  <small><i>Cf data source Pierre Fabre R&D & DataOra :).</i></small>
`};

const avatarBgCls = {
  "i_ii": "bg-I-II",
  "iii_iv": "bg-III-IV",
  "v_vi": "bg-V-VI"
}

const phototypes = {
  "I & II": "i_ii",
  "III & IV": "iii_iv",
  "V & VI": "v_vi"
}

const ageGroup = (age) => {
  if (age >= 60) {
    return "60-85";
  } else if (age >= 40) {
    return "40-59";
  } else if (age >= 20) {
    return "20-39";
  } else if (age >= 0) {
    return "0-19";
  }
}

const generateAvatar = (persona) => {
  const phototype = persona["type"];
  const sex = persona["sex"];
  const age_group = persona["age_group"];
  const country = persona["country"];
  const avatar = document.getElementById("avatar");
  avatar.classList.remove("d-none");
  Object.values(avatarBgCls).forEach(cls => avatar.classList.remove(cls));
  avatar.classList.add(avatarBgCls[phototype]);
  avatar.querySelector('.avatar-body').src = `https://raw.githubusercontent.com/Joz84/mysun/refs/heads/master/data/avatars/${sex}-${age_group}.png`;

  fetch('https://raw.githubusercontent.com/Joz84/mysun/refs/heads/master/flags.json')
  .then(response => response.json()) 
  .then(data => {
    avatar.querySelector('.avatar-flag').src = `https://www.countryflags.com/wp-content/uploads/${data["countries"][country]}`;
  })
  .catch(error => console.error('Erreur lors du chargement du JSON:', error));
}

const generateVignettes = (persona, simulation) => {

  const infoTexts = [
    infoText1(simulation["expo_percent"], simulation["protect_percent"]), 
    infoText2(simulation["sun_percent"]), 
    infoText3(simulation["photoaging_percent"], simulation["photoaging_delta"]), 
    infoText4(simulation["cancer_percent"]), 
    infoText5(recosText5(simulation["photoaging_percent"]))
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
  persona["type"] = phototypes[document.querySelector('.phototype.selected')?.textContent.trim()];
  persona["expo"] = Number(document.getElementById('expoInput').value.trim());
  persona["protect"] = Number(document.getElementById('protectInput').value.trim());
  persona["age_group"] = ageGroup(persona["age"]);

  console.dir(persona);
  generateAvatar(persona);
  (async () => {
    const simulation = await simulator(persona);
    console.dir(simulation);
    generateVignettes(persona, simulation);
  })();
}


