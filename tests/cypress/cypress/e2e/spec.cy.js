describe('Pizza tilauslomake', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('https://tiko.jamk.fi/~imjar/fronttiper/esimteht/pizza_anim/');
  });

  it('Täyttää tilauslomakkeen ja tarkistaa hinta', () => {
    // --- Täytä Nimi ---
    cy.get('input[id="nimi"]')
      .type('Matti Meikäläinen')
      .should('have.value', 'Matti Meikäläinen');

    // --- Täytä Puhelin ---
    cy.get('input[id="puhelin"]')
      .type('0401234567')
      .should('have.value', '0401234567');

    // --- Täytä Sähköposti ---
    cy.get('input[id="sposti"]')
      .type('matti.meikalainen@example.com')
      .should('have.value', 'matti.meikalainen@example.com');

    // --- Valitse koko ---
    cy.get('#koko').select('Suuri');

    // --- Valitse pohja ---
    cy.get('#Normaali').check({ force: true }).should('be.checked');

    // --- Valitse täytteet ---
    cy.get('#Tonnikala').check({ force: true });
    cy.get('#Kinkku').check({ force: true });
    cy.get('#Ananas').check({ force: true });
    // --- Tarkista hinta ---
    // Oletetaan, että hinta-elementti on id="hinta"
    cy.contains('p', 'Hinta:').should('contain', '13.00');
  });
});
