/* global window */

const CI_TENANT_ID = Cypress.env("CI_TENANT_ID");

const username = "";
const password = "";

const goTo = (url: string) => {
  if (url[0] !== "/") {
    throw new Error("goTo urls must begin with /");
  }
  cy.visit(`http://${CI_TENANT_ID}.localhost:3001` + url);
};

afterEach(() => {
  if (Cypress.env("WAIT_AFTER_TESTS")) {
    console.info("Done running cypress");
    cy.wait(7000); // wait 5 seconds
  }
});

describe("example: yarn-modern", () => {
  it("loads the deployed site", () => {
    goTo("/");
    cy.origin(
      "https://api.iguhealth.app",
      { args: { username, password } },
      ({ username, password }) => {
        cy.get("#email").type(username);
        cy.get("#password").type(password);
        cy.get("button[type=submit]").click();
      },
    );
    cy.get("#sidebar-multi-level-sidebar");
    cy.get("li[label=Data] > div:nth-child(2) span").click();
    cy.get("[data-testid='Resource Type=Basic']").click();
    cy.get("[data-testid=New]").click();

    cy.get("[data-testid=Actions]").click();
    cy.type("{downArrow}{enter}");

    //cy.url().should('contain', '/redirection-url')
  });
});
