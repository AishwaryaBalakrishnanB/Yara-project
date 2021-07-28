export function verifyAlertToolTips(labelMsg:string, bodyMsg:string){
    cy.get('div[role="alert"]',{timeout:7000}).find('label').contains(labelMsg).then(($alert)=>{
        cy.wrap($alert).invoke('text').then(($hdrMsg)=>{
           expect($hdrMsg).to.include(labelMsg)
        })
        cy.wrap($alert).siblings('label').invoke('text').then(($bodyMsg)=>{
           expect($bodyMsg).to.be.equal(bodyMsg)
        })    
    })
    cy.wait(5000)
}// datatable.hashes().forEach((data : any ) => {
        //     let keys = Object.keys(data)
        //     cy.get('').clear().type(data[keys[0]])
        // }) 