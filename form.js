
////////////// PHOTOTYPE ////////////// 
function selectPhototype(element) {
  document.querySelectorAll('.phototype').forEach(pt => pt.classList.remove('selected'));
  element.classList.add('selected');
}

////////////// AGE ////////////// 


////////////// GENRE ////////////// 
// Fonction pour sélectionner le sexe
function selectSex(card, sex) {
  let cards = document.querySelectorAll('.sex-card');
  cards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('sexInput').value = sex;
}

////////////// EXPOSITION ////////////// 
// Fonction pour sélectionner l'exposition
function selectExpo(card, expo) {
  let cards = document.querySelectorAll('.expo-card');
  cards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('expoInput').value = expo;
}

////////////// PROTECTION ////////////// 
// Fonction pour sélectionner le sexe
function selectProtect(card, protect) {
  let cards = document.querySelectorAll('.protect-card');
  cards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('protectInput').value = protect;
}

////////////// Two Hours ////////////// 
// Fonction pour sélectionner le sexe
function selectTwoHours(card, twoHours) {
  let cards = document.querySelectorAll('.two-hours-card');
  cards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  document.getElementById('twoHoursInput').value = twoHours;
}