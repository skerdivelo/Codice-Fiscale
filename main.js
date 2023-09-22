function calcolaCodiceFiscale(event) {
  event.preventDefault();
  const cognome = document.getElementById('cognome').value.trim().toUpperCase();
  const nome = document.getElementById('nome').value.trim().toUpperCase();
  const dataNascita = new Date(document.getElementById('dataNascita').value);
  const sesso = document.getElementById('sesso').value;
  const luogoNascita = document.getElementById('luogoNascita').value.trim().toUpperCase();
  const provincia = document.getElementById('provincia').value.trim().toUpperCase();
  const codiceFiscaleOutput = document.getElementById('codiceFiscale');

  const annoNascita = dataNascita.getFullYear() % 100;
  const meseNascita = dataNascita.getMonth() + 1;
  const giornoNascita = dataNascita.getDate();

  const vocali = ['A', 'E', 'I', 'O', 'U'];
  const consonanti = 'BCDFGHJKLMNPQRSTVWXYZ';

  
  if (
    cognome === '' ||
    nome === '' ||
    isNaN(dataNascita.getTime()) ||
    luogoNascita === '' ||
    provincia === ''
  ) {
    alert('Tutti i campi obbligatori devono essere compilati.');
    return;
  }

  // Calcolo i caratteri per il cognome
  let caratteriCognome = '';
  for (const char of cognome) {
    if (consonanti.includes(char)) {
      caratteriCognome += char;
      if (caratteriCognome.length === 3) break;
    }
  }

  if (caratteriCognome.length < 3) {
    for (const char of cognome) {
      if (vocali.includes(char)) {
        caratteriCognome += char;
        if (caratteriCognome.length === 3) break;
      }
    }
  }

  while (caratteriCognome.length < 3) {
    caratteriCognome += 'X';
  }

  // Calcolo i caratteri per il nome
  let caratteriNome = '';
  for (const char of nome) {
    if (consonanti.includes(char)) {
      caratteriNome += char;
      if (caratteriNome.length === 3) break;
    }
  }

  if (caratteriNome.length < 3) {
    for (const char of nome) {
      if (vocali.includes(char)) {
        caratteriNome += char;
        if (caratteriNome.length === 3) break;
      }
    }
  }

  while (caratteriNome.length < 3) {
    caratteriNome += 'X';
  }

  // Calcolo i caratteri per la data di nascita e sesso
  let caratteriDataSesso = '';
  const giornoSesso = sesso === 'femmina' ? giornoNascita + 40 : giornoNascita;
  caratteriDataSesso += annoNascita.toString().padStart(2, '0').slice(-2);
  
  const mesi = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'H', 7: 'L', 8: 'M', 9: 'P', 10: 'R', 11: 'S', 12: 'T'
  };
  
  caratteriDataSesso += mesi[meseNascita];
  
  caratteriDataSesso += giornoSesso.toString().padStart(2, '0');

  let codiceNumerico = '';
  
  if (provincia in codiciCitta) {
    codiceNumerico = codiciCitta[provincia];
  }else{
    alert('La provincia inserita non è valida.');
    return;
  }

  // Calcolo il codice fiscale senza il carattere di controllo
  const codiceFiscaleParziale = caratteriCognome + caratteriNome + caratteriDataSesso + codiceNumerico;

  // Calcolo il carattere di controllo
  const carattereControllo = calcolaCarattereControllo(codiceFiscaleParziale);

  // Visualizzo il codice fiscale risultante
  const codiceFiscaleCompleto = codiceFiscaleParziale + carattereControllo;
  codiceFiscaleOutput.innerHTML = "Il tuo codice fiscale: "+codiceFiscaleCompleto;
}

function calcolaCarattereControllo(codiceFiscaleParziale){

  const tabellaC = 
  {
    'A': 0, 'F': 5, 'K': 10, 'P': 15, 'U': 20,
    'B': 1, 'G': 6, 'L': 11, 'Q': 16, 'V': 21,
    'C': 2, 'H': 7, 'M': 12, 'R': 17, 'W': 22,
    'D': 3, 'I': 8, 'N': 13, 'S': 18, 'X': 23,
    'E': 4, 'J': 9, 'O': 14, 'T': 19, 'Y': 24,
    'Z': 25, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
    '5': 5, '6': 6, '7': 7, '8': 8, '9' : 9
  };

  const tabellaD = 
  {
    'A': 1, 'F': 13, 'K': 2, 'P': 3, 'U': 16,
    'B': 0, 'G': 15, 'L': 4, 'Q': 6, 'V': 10,
    'C': 5, 'H': 17, 'M': 18, 'R': 8, 'W': 22,
    'D': 7, 'I': 19, 'N': 20, 'S': 12, 'X': 25,
    'E': 9, 'J': 21, 'O': 11, 'T': 14, 'Y': 24,
    'Z': 23, '0': 1, '1': 0, '2': 5, '3': 7, '4': 9,
    '5': 13, '6': 15, '7': 17, '8': 19, '9': 21
  };

  const tabellaE = 
  {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E',
    5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O',
    15: 'P', 16: 'Q', 17: 'R', 18: 'S', 19: 'T',
    20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y',
    25: 'Z'
  }; 

  let somma = 0;
  for (let i = 1; i <= 15; i++){
    if (i % 2 === 0){
      somma += tabellaC[codiceFiscaleParziale[i - 1]];
    }else{
      somma += tabellaD[codiceFiscaleParziale[i - 1]];
    }
  }
  let resto = somma % 26;
  return tabellaE[resto];
}

const inserisciDati = document.getElementById('inserisciDatiBtn');
document.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    inserisciDati.click();
  }
});


inserisciDati.addEventListener('click', calcolaCodiceFiscale);

const codiciCitta = {
  'BS': 'B157' , 'MI': 'F205' , 'NA': 'F839' , 'RM': 'H501' , 'VE': 'L736'
};
