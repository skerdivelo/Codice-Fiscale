function calcolaCodiceFiscale() {
  const cognome = document.getElementById('cognome').value.toUpperCase();
  const nome = document.getElementById('nome').value.toUpperCase();
  const dataNascita = new Date(document.getElementById('dataNascita').value);
  const sesso = document.getElementById('sesso').value;
  const luogoNascita = document.getElementById('luogoNascita').value.toUpperCase();

  const annoNascita = dataNascita.getFullYear() % 100;
  const meseNascita = dataNascita.getMonth() + 1;
  const giornoNascita = dataNascita.getDate();

  const vocali = ['A', 'E', 'I', 'O', 'U'];
  const consonanti = 'BCDFGHJKLMNPQRSTVWXYZ';

  // Calcola i caratteri per il cognome
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

  // Calcola i caratteri per il nome
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

  // Calcola i caratteri per la data di nascita e sesso
  let caratteriDataSesso = '';
  const giornoSesso = sesso === 'femmina' ? giornoNascita + 40 : giornoNascita;
  caratteriDataSesso += annoNascita.toString().padStart(2, '0').slice(-2);
  
  const mesi = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'H', 7: 'L', 8: 'M', 9: 'P', 10: 'R', 11: 'S', 12: 'T'
  };
  
  caratteriDataSesso += mesi[meseNascita];
  
  caratteriDataSesso += giornoSesso.toString().padStart(2, '0');

  // Genera un codice di 3 numeri random
  const codiceNumerico = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  // Calcola il codice fiscale senza il carattere di controllo
  const codiceFiscaleParziale = caratteriCognome + caratteriNome + caratteriDataSesso + luogoNascita.charAt(0) + codiceNumerico;

  // Calcola il carattere di controllo
  const carattereControllo = calcolaCarattereControllo(codiceFiscaleParziale);

  // Visualizza il codice fiscale risultante
  const codiceFiscaleCompleto = codiceFiscaleParziale + carattereControllo;
  alert("Codice Fiscale: " + codiceFiscaleCompleto);
}

function calcolaCarattereControllo(codice) {
  const caratteriPari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caratteriDispari = "BAKPLCQDREVOSFTGJHNUWMXZY";
  let sommaDispari = 0;
  let sommaPari = 0;

  for (let i = 0; i < 15; i++) {
    const carattere = codice.charAt(i);

    if (i % 2 === 0) {
      sommaPari += caratteriPari.indexOf(carattere);
    } else {
      sommaDispari += caratteriDispari.indexOf(carattere);
    }
  }

  const totale = sommaPari + sommaDispari;
  const carattereControllo = String.fromCharCode(65 + (totale % 26));
  return carattereControllo;
}

const inserisciDati = document.getElementById('inserisciDatiBtn');
inserisciDati.addEventListener('click', calcolaCodiceFiscale);
