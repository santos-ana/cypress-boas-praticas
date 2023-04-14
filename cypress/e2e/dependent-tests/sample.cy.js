describe('Dependent tests bad practice', () => {

  it('crud a note', () => {
    //login
    cy.visit('https://notes-serverless-app.com/login')
    
    cy.get('#email').type(Cypress.env('user_email'))
    cy.get('#password').type(Cypress.env('user_password'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.intercept('https://90xbti2sk5.execute-api.eu-central-1.amazonaws.com/prod/notes').as('Notes')

    cy.wait('@Notes')

    cy.contains('h1', 'Your Notes').should('be.visible')

    //criar nota
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()
    cy.wait('@Notes')

    //editar nota
    cy.get('.list-group').should('contain', 'My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()
    cy.wait('@Notes')

    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible').click()

    //deletar nota
    cy.contains('Delete').click()
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
