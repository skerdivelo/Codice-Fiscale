const nome = document.getElementById('nome');
const cognome = document.getElementById('cognome');
const dataNascita = document.getElementById('dataNascita');
const sesso = document.getElementById('sesso');
const luogoNascita = document.getElementById('luogoNascita');
const inserisciDati = document.getElementById('inserisciDatiBtn');

// Funzione per calcolare il codice fiscale
function calcolaCodiceFiscale() {
    const cognomeVal = cognome.value.toUpperCase();
    const nomeVal = nome.value.toUpperCase();
    const dataNascitaVal = dataNascita.value;
    const sessoVal = sesso.value;
    const luogoNascitaVal = luogoNascita.value.toUpperCase();
  
    // Estrai le consonanti dal cognome (prime tre) e dal nome (prime tre)
    const cognomeConsonanti = estraiConsonanti(cognomeVal);
    const nomeConsonanti = estraiConsonanti(nomeVal);
  
    // Estrai l'anno di nascita (ultime due cifre)
    const annoNascita = dataNascitaVal.substring(2, 4);
  
    // Estrai il mese di nascita in base alla tabella fornita
    const meseNascita = calcolaMeseNascita(dataNascitaVal);
  
    // Estrai il giorno di nascita e il sesso
    const giornoNascita = dataNascitaVal.substring(8, 10);
    const sessoCode = calcolaSessoCode(sessoVal);
  
    // Estrai il codice catastale o Stato di nascita (quattro caratteri)
    const luogoNascitaCode = luogoNascitaVal.substring(0, 4).toUpperCase();
  
    // Calcola il carattere di controllo
    const carattereControllo = calcolaCarattereControllo(
      cognomeConsonanti + nomeConsonanti + annoNascita + meseNascita + giornoNascita + sessoCode + luogoNascitaCode
    );
  
    // Crea il codice fiscale completo
    const codiceFiscale = cognomeConsonanti + nomeConsonanti + annoNascita + meseNascita + giornoNascita + sessoCode + luogoNascitaCode + carattereControllo;
  
    // Visualizza il codice fiscale o fai qualsiasi altra cosa desideri
    alert(`Il tuo codice fiscale è: ${codiceFiscale}`);
  }
  
  // Funzione per estrarre le consonanti da una stringa
  function estraiConsonanti(stringa) {
    const consonanti = [];
    for (let i = 0; i < stringa.length && consonanti.length < 3; i++) {
      const carattere = stringa[i];
      if ('BCDFGHJKLMNPQRSTVWXYZ'.includes(carattere)) {
        consonanti.push(carattere);
      }
    }
    while (consonanti.length < 3) {
      consonanti.push('X');
    }
    return consonanti.join('');
  }
  
  // Funzione per calcolare il mese di nascita in base alla data
  function calcolaMeseNascita(dataNascita) {
    const mesi = "ABCDEHLMPRST";
    const meseIndex = parseInt(dataNascita.substring(5, 7)) - 1;
    return mesi[meseIndex];
  }
  
  // Funzione per calcolare il codice del sesso
  function calcolaSessoCode(sesso) {
    return sesso === 'femmina' ? '4' : '0';
  }
  
  // Funzione per calcolare il carattere di controllo
  function calcolaCarattereControllo(codiceParziale) {
    const caratteriDispari = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caratteriPari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let sommaDispari = 0;
    let sommaPari = 0;
  
    for (let i = 0; i < codiceParziale.length; i++) {
      const carattere = codiceParziale[i];
      if (i % 2 === 0) {
        sommaPari += caratteriPari.indexOf(carattere);
      } else {
        sommaDispari += caratteriDispari.indexOf(carattere);
      }
    }
  
    const resto = (sommaDispari + sommaPari) % 26;
    return caratteriPari[resto];
  }
  
  // Aggiungi un gestore di eventi al pulsante "Inserisci Dati"
  inserisciDati.addEventListener('click', calcolaCodiceFiscale);
  
  