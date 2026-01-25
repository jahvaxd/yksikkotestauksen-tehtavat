describe('JAMK Wikipedia E2E -testi', () => {
  it('Suomenkielinen haku ja vaihto englanniksi', () => {
    // Käytetään desktop-näkymää
    cy.viewport(1280, 800);

    // 1. Mene suomenkieliselle Wikipedian pääsivulle
    cy.visit('https://fi.wikipedia.org');

    cy.visit('https://fi.wikipedia.org/w/index.php?search=Jamk');

    // 3. Tarkista, että olemme oikealla sivulla
    cy.location('pathname', { timeout: 10000 }).should((pathname) => {
      expect(pathname).to.match(/\/wiki\/Jyv.*skyl.*n_ammattikorkeakoulu/);
    });

    // 4. Rullaa kohtaan "Kampukset"
    cy.contains('h2', 'Kampukset').scrollIntoView();

    // 5. Tarkista, että "Kampukset" on näkyvillä
    cy.contains('h2', 'Kampukset').should('be.visible');

    // 6. Odota 5 sekuntia
    cy.wait(5000);

    // 7. Vaihda kieli englanniksi
    cy.visit(
      'https://en.wikipedia.org/wiki/JAMK_University_of_Applied_Sciences',
    );
    cy.reload();
    // 8. Tarkista, että uusi sivu on oikea
    cy.location('pathname', { timeout: 10000 }).should((pathname) => {
      expect(pathname).to.match('wiki/JAMK_University_of_Applied_Sciences');
    });

    cy.contains('JAMK University of Applied Sciences').should('be.visible');
  });
});
