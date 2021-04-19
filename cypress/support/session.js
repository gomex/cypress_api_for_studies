// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

const httpStatus = require("http-status-codes");

const credentials = {
  HEADERS: {
    'Content-type': 'application/json'
  }
}

Cypress.Commands.add('getToken', () =>{
  cy.request({
      method: 'POST',
      url: '/login',
      headers: credentials.HEADERS,
      failOnStatusCode: false,
      body: {
          email: Cypress.env('email'),
          password: Cypress.env('password')
        }
  })
  .then(response =>{
      expect(response.status).to.eql(httpStatus.StatusCodes.OK)
      localStorage.setItem('token', response.body.authorization)
      expect(localStorage.getItem('token')).not.null
      cy.log(localStorage.getItem('token'))
  })      
})

Cypress.Commands.add('clearSession', () => {
  localStorage.removeItem('token');
});

export default credentials
