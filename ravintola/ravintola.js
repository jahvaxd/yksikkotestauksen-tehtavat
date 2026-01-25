/*
TIKO RAVINTOLA
OHJELMAKOODI
*/
const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 3 },
    { ruoka: 'Salsa', hinta: 2 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 6 },
    { ruoka: 'Makaroonilaatikko', hinta: 5 },
    { ruoka: 'Kasvispihvi', hinta: 6 },
    { ruoka: 'Kanasalaatti', hinta: 6 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 4 },
    { ruoka: 'Jäätelö', hinta: 3 },
    { ruoka: 'Pulla', hinta: 3 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 3 },
    { ruoka: 'Maito', hinta: 2 },
    { ruoka: 'Mehu', hinta: 3 },
  ];

  this.paikkojenMaara = 15;
  this.paikat; // Tähän muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Asiakkaiden tarjoilu ja tilaukset
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  // Tarkistetaan, että paikkoja on tarpeeksi
  const paikatVarattu = this.varaaPaikat(asiakkaidenMaara);
  if (!paikatVarattu) {
    throw new Error('Ei tarpeeksi vapaita paikkoja');
  }

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?',
    );

    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean()),
    );

    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }

  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

// Päivitetty generoiPaikat
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

// Päivitetty varaaPaikat
Ravintola.prototype.varaaPaikat = function (varauksenMaara = 1) {
  // Luodaan paikat, jos niitä ei ole
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  // Lasketaan vapaat paikat
  const vapaat = this.paikat.filter((paikka) => !paikka).length;

  // Tarkistetaan riittävyys
  if (vapaat < varauksenMaara) {
    return false;
  }

  // Varataan paikat
  let varattu = 0;
  for (let i = 0; i < this.paikat.length && varattu < varauksenMaara; i++) {
    if (!this.paikat[i]) {
      this.paikat[i] = true;
      varattu++;
    }
  }

  return true;
};

/**
 * Tilaa aterian ja palauttaa ruoat ja hinnan
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman,
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  )
    throw new TypeError();

  const ruoat = [];

  if (ottaaAlkuruoan)
    ruoat.push(this.palautaTaulukonSatunnainenArvo(this.alkuruoat));
  ruoat.push(this.palautaTaulukonSatunnainenArvo(this.paaruoat));
  if (ottaaJalkiruoan)
    ruoat.push(this.palautaTaulukonSatunnainenArvo(this.jalkiruoat));
  if (ottaaJuoman) ruoat.push(this.palautaTaulukonSatunnainenArvo(this.juomat));

  const summa = this.laskeLasku(ruoat);

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon taulukosta
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee tilauksen summan
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  if (!Array.isArray(ruoat)) throw new TypeError();

  return ruoat.reduce((summa, ruoka) => summa + ruoka.hinta, 0);
};

const ravintola = new Ravintola();
export default ravintola;
