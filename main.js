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

  if (cognome.length < 2 || nome.length < 2) {
    alert('Il cognome e il nome devono essere composti da almeno 2 caratteri.');
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
  'AG': 'A003', // Agrigento
  'AL': 'A004', // Alessandria
  'AN': 'A005', // Ancona
  'AO': 'A006', // Aosta
  'AR': 'A007', // Arezzo
  'AP': 'A008', // Ascoli Piceno
  'AT': 'A009', // Asti
  'AV': 'A010', // Avellino
  'BA': 'A011', // Bari
  'BT': 'A012', // Barletta-Andria-Trani
  'BL': 'A013', // Belluno
  'BN': 'A014', // Benevento
  'BG': 'A015', // Bergamo
  'BI': 'A016', // Biella
  'BO': 'A017', // Bologna
  'BZ': 'A018', // Bolzano
  'BS': 'B157', // Brescia
  'BR': 'A019', // Brindisi
  'CA': 'A020', // Cagliari
  'CL': 'A021', // Caltanissetta
  'CB': 'A022', // Campobasso
  'CI': 'A023', // Carbonia-Iglesias
  'CE': 'A024', // Caserta
  'CT': 'A025', // Catania
  'CZ': 'A026', // Catanzaro
  'CH': 'A027', // Chieti
  'CO': 'A028', // Como
  'CS': 'A029', // Cosenza
  'CR': 'A030', // Cremona
  'KR': 'A031', // Crotone
  'CN': 'A032', // Cuneo
  'EN': 'A033', // Enna
  'FM': 'A034', // Fermo
  'FE': 'A035', // Ferrara
  'FI': 'A036', // Firenze
  'FG': 'A037', // Foggia
  'FC': 'A038', // Forlì-Cesena
  'FR': 'A039', // Frosinone
  'GE': 'A040', // Genova
  'GO': 'A041', // Gorizia
  'GR': 'A042', // Grosseto
  'IM': 'A043', // Imperia
  'IS': 'A044', // Isernia
  'SP': 'A045', // La Spezia
  'AQ': 'A046', // L'Aquila
  'LT': 'A047', // Latina
  'LE': 'A048', // Lecce
  'LC': 'A049', // Lecco
  'LI': 'A050', // Livorno
  'LO': 'A051', // Lodi
  'LU': 'A052', // Lucca
  'MC': 'A053', // Macerata
  'MN': 'A054', // Mantova
  'MS': 'A055', // Massa-Carrara
  'MT': 'A056', // Matera
  'VS': 'A057', // Medio Campidano
  'ME': 'A058', // Messina
  'MI': 'F205', // Milano
  'MO': 'A059', // Modena
  'MB': 'A060', // Monza e Brianza
  'NA': 'F839', // Napoli
  'NO': 'A061', // Novara
  'NU': 'A062', // Nuoro
  'OG': 'A063', // Ogliastra
  'OT': 'A064', // Olbia-Tempio
  'OR': 'A065', // Oristano
  'PD': 'A066', // Padova
  'PA': 'A067', // Palermo
  'PR': 'A068', // Parma
  'PV': 'A069', // Pavia
  'PG': 'A070', // Perugia
  'PU': 'A071', // Pesaro e Urbino
  'PE': 'A072', // Pescara
  'PC': 'A073', // Piacenza
  'PI': 'A074', // Pisa
  'PT': 'A075', // Pistoia
  'PN': 'A076', // Pordenone
  'PZ': 'A077', // Potenza
  'PO': 'A078', // Prato
  'RG': 'A079', // Ragusa
  'RA': 'A080', // Ravenna
  'RC': 'A081', // Reggio Calabria
  'RE': 'A082', // Reggio Emilia
  'RI': 'A083', // Rieti
  'RN': 'A084', // Rimini
  'RM': 'H501', // Roma
  'RO': 'A085', // Rovigo
  'SA': 'A086', // Salerno
  'VS': 'A087', // Sanluri
  'SS': 'A088', // Sassari
  'SV': 'A089', // Savona
  'SI': 'A090', // Siena
  'SR': 'A091', // Siracusa
  'SO': 'A092', // Sondrio
  'TA': 'A093', // Taranto
  'TE': 'A094', // Teramo
  'TR': 'A095', // Terni
  'TO': 'A096', // Torino
  'TP': 'A097', // Trapani
  'TN': 'A098', // Trento
  'TV': 'A099', // Treviso
  'TS': 'A100', // Trieste
  'UD': 'A101', // Udine
  'VA': 'A102', // Varese
  'VE': 'L736', // Venezia
  'VB': 'A103', // Verbano-Cusio-Ossola
  'VC': 'A104', // Vercelli
  'VR': 'A105', // Verona
  'VV': 'A106', // Vibo Valentia
  'VI': 'A107', // Vicenza
  'VT': 'A108', // Viterbo
};
