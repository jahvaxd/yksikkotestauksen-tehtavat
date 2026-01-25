import { describe, it, expect, beforeEach } from 'vitest';
import ravintola from '../ravintola/ravintola'; // Polku siihen tiedostoon, missä Ravintola on

describe('Ravintola testit', () => {
  beforeEach(() => {
    // Nollaa paikat ennen jokaista testiä, jotta testit eivät vaikuta toisiinsa
    ravintola.generoiPaikat();
  });

  it('Testitapaus 1: syoRavintolassa menee läpi, jos asiakkaita <= paikkojen määrä', () => {
    const asiakkaidenMaara = 10;
    const tilaukset = ravintola.syoRavintolassa(asiakkaidenMaara);
    expect(tilaukset.length).toBe(asiakkaidenMaara);
  });

  it('Testitapaus 2: syoRavintolassa ei mene läpi, jos paikkoja ei ole tarpeeksi', () => {
    // Ensimmäinen varaus
    const ensimmäinenVarauksenMaara = 10;
    const ensimmäisetTilaukset = ravintola.syoRavintolassa(
      ensimmäinenVarauksenMaara,
    );
    expect(ensimmäisetTilaukset.length).toBe(ensimmäinenVarauksenMaara);

    // Toinen varaus, pitäisi epäonnistua (paikkoja jäljellä 5, yritetään varata 6)
    const toinenVarauksenMaara = 6;
    expect(() => {
      ravintola.syoRavintolassa(toinenVarauksenMaara);
    }).toThrowError('Ei tarpeeksi vapaita paikkoja');
  });

  it('Testitapaus 3: laskeLasku toimii oikein uudella ohjelmakoodilla', () => {
    // Tehdään testitilauksia manuaalisesti
    const testTilaukset = [
      { ruoka: 'Tomaattikeitto', hinta: 4 },
      { ruoka: 'Kalakeitto', hinta: 6 },
      { ruoka: 'Jäätelö', hinta: 3 },
      { ruoka: 'Tee', hinta: 3 },
    ];

    const summa = ravintola.laskeLasku(testTilaukset);
    expect(summa).toBe(16); // 4 + 6 + 3 + 3 = 16
  });
});
