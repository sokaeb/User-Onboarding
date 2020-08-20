// describe('User Onboard App Tests', () => {
//     describe('Can type into inputs and submit data', () => {
//         it('can navigate to http://localhost:3000', () => {
//             cy.visit('http://localhost:3000')
//             cy.url().should('include', 'localhost')
//         })
//         it('can get name inputs and type a name', () => {
//             cy.get('input[name="first_name"]')
//                 .type('Polly')
//                 .should('have.value', 'Polly')
//             cy.get('input[name="last_name"]')
//                 .type('Piper')
//                 .should('have.value', 'Piper')
//         })
//         it('can get email input and type an email', () => {
//             cy.get('input[name="email"]')
//                 .type('polly@pip.com')
//                 .should('have.value', 'polly@pip.com')
//         })
//         it('can get password input and type a password', () => {
//             cy.get('input[name="password"]')
//                 .type('12345678')
//                 .should('have.value', '12345678')
//         })
//         it('can select a role from the dropdown', () => {
//             cy.get('select').select('Student').should('have.value', 'Student')
//         })
//         it('can check the terms of service box', () => {
//             cy.get('input[name="terms"]').click()
//         })
//         it('can click the submit button to submit the data', () => {
//             cy.get('#submitBtn').click()
//         })
//         it('can display data on DOM', () => {
//             cy.contains('Polly Piper').should('exist')
//         })
//     })
// })


describe('Run tests for empty inputs', () => {
    describe('Can display error message for empty inputs', () => {
        it('can navigate to http://localhost:3000', () => {
            cy.visit('http://localhost:3000')
            cy.url().should('include', 'localhost')
        })
    it('checks for empty inputs', () => {
        cy.get('input[name="first_name"]').should('have.value', '')
        })    
    })
})