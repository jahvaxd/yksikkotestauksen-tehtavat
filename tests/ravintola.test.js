import { describe, it, expect } from 'vitest';
import ravintola from '../ravintola/ravintola';

describe('Ravintola-yksikkötestit (Vitest)', () => {
  /* -------------------------
     1. laskeLasku
  -------------------------- */
  describe('laskeLasku', () => {
    it('palauttaa oikean summan kun kaikki valittu', () => {
      // pääruoka 6 + alkuruoka 4 + jälkiruoka 4 + juoma 3 = 17
      const summa = ravintola.laskeLasku(true, true, true);
      expect(summa).toBe(17);
    });

    it('palauttaa oikean summan kun vain pääruoka', () => {
      const summa = ravintola.laskeLasku(false, false, false);
      expect(summa).toBe(6);
    });

    it('palauttaa oikean summan kun alkuruoka ja juoma', () => {
      // 6 + 4 + 3 = 13
      const summa = ravintola.laskeLasku(true, false, true);
      expect(summa).toBe(13);
    });
  });

  /* -------------------------
     2. palautaTaulukonSatunnainenArvo
  -------------------------- */
  describe('palautaTaulukonSatunnainenArvo', () => {
    it('palauttaa arvon, joka löytyy alkuruokien taulukosta', () => {
      const taulukko = ravintola.alkuruoat;
      const arvo = ravintola.palautaTaulukonSatunnainenArvo(taulukko);

      expect(taulukko).toContain(arvo);
    });

    it('palauttaa arvon, joka löytyy juomien taulukosta', () => {
      const taulukko = ravintola.juomat;
      const arvo = ravintola.palautaTaulukonSatunnainenArvo(taulukko);

      expect(taulukko.includes(arvo)).toBe(true);
    });
  });

  /* -------------------------
     3. syoRavintolassa
  -------------------------- */
  describe('syoRavintolassa', () => {
    it('palauttaa taulukon kun asiakkaita on sallittu määrä', () => {
      const tulos = ravintola.syoRavintolassa(3);

      expect(Array.isArray(tulos)).toBe(true);
    });

    it('palauttaa undefined kun asiakkaita liikaa', () => {
      const tulos = ravintola.syoRavintolassa(100);

      expect(tulos).toBeUndefined();
    });
  });
});
