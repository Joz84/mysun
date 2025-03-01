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

  const ages = {
    "0-20 ans": "15",
    "20-40 ans": "30",
    "40-60 ans": "50",
    "60+ ans": "70"
  }

  const sexs = {
    "Homme": "male",
    "Femme": "female",
    "Autre": "female",
  }


  const vignettes = document.querySelectorAll('.vignette');
  const avatar = document.getElementById("avatar");
  const country = document.getElementById("country").value.trim();
  const age = document.getElementById("age").value.trim();
  const sex = document.querySelector('input[name="sex"]:checked')?.value.trim() || "Non spécifié";
  const phototype = document.querySelector('.phototype.selected')?.textContent.trim() || "Non spécifié";
  const infoText = `Pays: ${country}\nÂge: ${age}\nSexe: ${sex}\nPhototype: ${phototype}`;
  
  avatar.classList.remove("d-none");
  avatar.classList.remove("bg-I-II");
  avatar.classList.remove("bg-III-IV");
  avatar.classList.remove("bg-V-VI");
  avatar.classList.add(phototypes[phototype]);
  avatar.querySelector('.avatar-body').src = `data/avatars/${sexs[sex]}-${ages[age]}.png`;

  fetch('flags.json')
  .then(response => response.json()) 
  .then(data => {
    console.log(data);
    avatar.querySelector('.avatar-flag').src = `"https://www.countryflags.com/wp-content/uploads/${data["countries"][country]}-flag-png-large.png"`;
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