// set cookie control cookie
Cypress.Commands.add('setCookieControl', () => {
  cy.setCookie(
    'CookieControl',
    JSON.stringify({
      necessaryCookies: [],
      optionalCookies: { analytics: 'revoked', marketing: 'revoked' },
      statement: {},
      consentDate: 0,
      consentExpiry: 0,
      interactedWith: true,
      user: 'anonymous',
    }),
  );
});

// Check status code of href
Cypress.Commands.add('checkLinkHref', (selector) => {
  cy.get(selector).each(($el) => {
    cy.wrap($el)
      .invoke('attr', 'href')
      .then((href: string) => {
        cy.request(href).its('status').should('eq', 200);
      });
  });
});

// Intercept response
Cypress.Commands.add('interceptQuestion', (question: string) => {
  cy.intercept(`/en/pension-wise-triage/${question}?*`).as(question);
});

// Expand Accordion
Cypress.Commands.add('verifyExpandableSectionExists', () => {
  cy.get('[data-testid="expandable-section"]').then(($elem) => {
    cy.wrap($elem).click();
    cy.wrap($elem).find('svg').should('be.visible');
    cy.wrap($elem).find('p').should('have.length.greaterThan', 0);
  });
});

Cypress.Commands.add('provideAnswer', (question: string, answer: string) => {
  cy.interceptQuestion(question);
  cy.get(`[data-testid="radio-button"] input`).check(answer, {
    force: true,
  });
  cy.get(`button[data-testid='continue']`).click();
  cy.wait(`@${question}`).its('response.statusCode').should('eq', 200);
});
