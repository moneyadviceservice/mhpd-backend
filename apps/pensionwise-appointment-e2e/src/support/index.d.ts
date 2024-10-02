/// <reference types="cypress"/>
/// <reference types="@cypress-audit/lighthouse" />

declare namespace Cypress {
  interface Chainable {
    setCookieControl(): void;
    verifyTaskCompletion(taskNumber: number): Chainable<Element>;
    checkLinkHref(selector: string): Chainable<Element>;
    interceptResponse(response: string): void;
    viewSummaryDocument(
      selectedHomePageOption: string,
      selectedDataTestId: string,
    ): void;
    viewPensionGuidance(selectedHomePageOption: string): void;
  }
}
