/// <reference types="cypress" />

import * as utilityHelper from "./helper";
import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";


Given('Logged as user with role Global admin and role Global settings and PolarisMaintenance', () =>
{
    cy.LoginToApplication();
    //cy.visit('https://agrocore-admin-polaris.stage.emea.yaradigitallabs.io/')
})
And('clicked  button{string}',(button1) =>
{
    cy.contains(button1, {timeout:11000 }).click()
    
})
Given('I am logged in', () => 
{
    cy.url().should('include', 'admin/countries')
})
//SCENARIO -1 -"ADD COUNTRY"

When('I clicked button {string} a modal appeared', (button) => 
{
    cy.contains(button, { timeout: 10000 }).click()
})
And('I create new country with following details:', (datatable) =>
{
   
    datatable.hashes().forEach((ele: any) => {

        for (let propName in ele) {
            switch (propName) {
                case 'CountryName':
                    utilityHelper.setInputValue('[data-cy="countryFormInputName"]',ele[propName])
                    break;

                case 'CountryCode':
                    utilityHelper.setInputValue('[data-cy="countryFormInputCountryCode"]',ele[propName])
                    break;

                case 'Currency':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectCurrency"]', ele[propName])
                   
                    break;

                case 'Whichunitsystemisusing?':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectIsDefaultMetric"]',ele[propName])
                    break;

                case 'Windspeedunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectWindSpeedUnit"] ',ele[propName])
                    break;

                case 'Precipitationamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectPrecipitationAmountUnit"] ',ele[propName])
                    break;

                case 'Evapotranspirationunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectEvapotranspirationRefUnit"] ',ele[propName])
                    break;

                case 'Qpfsnowamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectQpfSnowAmountUnit"] ',ele[propName])
                    break;

                case 'Temperatureunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectTemperatureUnit"] ',ele[propName])
                    break;

                case 'Dewpointunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectDewPointUnit"]',ele[propName])
                    break;

                case 'ProductSetCode(Optional)':
                    utilityHelper.setInputValue('[data-cy="countryFormInputProductSetCode"]',ele[propName])
                    break;

                case 'Solutions(Optional)':
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],false)
                    break;

                default:
                    break;
            }
        }
    })
})
And('I clicked button {string}', (button) => {
    cy.contains(button).click()
})
 Then('I see tooltip{string}and{string}', (headerMsg, bodyMsg) => {

    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
})

And('in countryTable should be added row with following data:', (datatable) => {
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial')
    //utilityHelper.SearchElement('Name',' trial ')
    utilityHelper.verifyTableData(datatable, 'countryTable')
})


//SCENARIO-2 Edit Country without save the data
When('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows', (button1,button2) => {
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial')
    //utilityHelper.SearchElement('Name', ' trial ')
    cy.get('[data-cy=countryTableEditMenu]').click()
    //cy.get('sc-fzoXWK hnKkAN').contains(button1,button2)
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose {string} a modal appeared with following data:', (button) => {
    cy.contains(button).click()

})
And('I changed data in all fields:', (datatable) => {
 
    datatable.hashes().forEach((ele: any) => {

        for (let propName in ele) {
            switch (propName) {
                case 'CountryName':
                    utilityHelper.setInputValue('[data-cy="countryFormInputName"]',ele[propName])
                    break;

                case 'CountryCode':
                    utilityHelper.setInputValue('[data-cy="countryFormInputCountryCode"]',ele[propName])
                    break;

                case 'Currency':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectCurrency"]', ele[propName])
                   
                    break;

                case 'Whichunitsystemisusing?':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectIsDefaultMetric"]',ele[propName])
                    break;

                case 'Windspeedunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectWindSpeedUnit"] ',ele[propName])
                    break;

                case 'Precipitationamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectPrecipitationAmountUnit"] ',ele[propName])
                    break;

                case 'Evapotranspirationunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectEvapotranspirationRefUnit"] ',ele[propName])
                    break;

                case 'Qpfsnowamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectQpfSnowAmountUnit"] ',ele[propName])
                    break;

                case 'Temperatureunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectTemperatureUnit"] ',ele[propName])
                    break;

                case 'Dewpointunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectDewPointUnit"]',ele[propName])
                    break;

                case 'ProductSetCode(Optional)':
                    utilityHelper.setInputValue('[data-cy="countryFormInputProductSetCode"]',ele[propName])
                    break;

                case 'Solutions(Optional)':
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],true)
                    break;

                default:
                    break;
            }
        }
    })
})
And('I clicked button "<X>" in right up corner of modal', () => {
    cy.get('[data-cy=countryEditFormButtonClose]').click()
   // cy.contains(button).click()
})
Then('modal disappeared, should not changes any data for country Test', () => {
    cy.get('tbody>tr').should('have.length',1)
    //cy.get('tr.sc-fzoWqW.LxbjH').should('be.visible')
    //cy.get('sc-fzoWqW LxbjH').should('not.change')

})

//SCENARIO-3 Edit Country and save changes
When ('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows',(button1,button2)=>{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial ') 
    //utilityHelper.SearchElement('Name', ' trial ')
    cy.get('[data-cy=countryTableEditMenu]').click()
    //cy.get('sc-fzoXWK hnKkAN').contains(button1,button2)
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose {string} a modal appeared with following data:',(button)=>{
    cy.contains(button).click()
})

 And('I changed data in all fields:',(datatable)=>{
    datatable.hashes().forEach((ele: any) => {

        for (let propName in ele) {
            switch (propName) {
                case 'CountryName':
                    utilityHelper.setInputValue('[data-cy="countryFormInputName"]',ele[propName])
                    break;

                case 'CountryCode':
                    utilityHelper.setInputValue('[data-cy="countryFormInputCountryCode"]',ele[propName])
                    break;

                case 'Currency':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectCurrency"]', ele[propName])
                   
                    break;

                case 'Whichunitsystemisusing?':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectIsDefaultMetric"]',ele[propName])
                    break;

                case 'Windspeedunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectWindSpeedUnit"] ',ele[propName])
                    break;

                case 'Precipitationamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectPrecipitationAmountUnit"] ',ele[propName])
                    break;

                case 'Evapotranspirationunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectEvapotranspirationRefUnit"] ',ele[propName])
                    break;

                case 'Qpfsnowamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectQpfSnowAmountUnit"] ',ele[propName])
                    break;

                case 'Temperatureunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectTemperatureUnit"] ',ele[propName])
                    break;

                case 'Dewpointunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectDewPointUnit"]',ele[propName])
                    break;

                case 'ProductSetCode(Optional)':
                    utilityHelper.setInputValue('[data-cy="countryFormInputProductSetCode"]',ele[propName])
                    break;

                case 'Solutions(Optional)':
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],true)
                    break;

                default:
                    break;
            }
        }
    })
})

And('I clicked button {string}',(button)=>
{
    cy.contains(button).click()
})
Then('I see tooltip{string}and{string}',(headerMsg,bodyMsg)=>
{
    utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
And('data for country should be updated in row:',(dataTable)=>
{
    //utilityHelper.SearchElement('Name', 'trial')
    utilityHelper.verifyTableData(dataTable, 'countryTable')
})



//SCENARIO-4  Denied deleting of country without regions
When ('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows',(button1,button2)=>
{
   
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', 'trial')
    cy.get('[data-cy=countryTableEditMenu]').click()
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose "Delete" a content appeared {string}and{string}',(button1,button2)=>
{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(button1).should('be.visible')
    cy.get('.hSeVfH',{timeout:7000}).contains(button2).should('be.visible')
    // cy.get('[class="sc-AxmLO cizzDZ"]',{timeout:10000}).contains(button1).should('be.visible')
    // cy.get('[class="sc-AxmLO hSeVfH"]',{timeout:10000}).contains(button2).should('be.visible')

})
And("clicked button {string}",(button)=>
{
    cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()

})
Then('modal disappeared, should not changes anything in data or row for country  trial 1',()=>
{
    cy.get('tbody > .sc-fzoWqW > :nth-child(1)').should('be.visible')
   // cy.get('thead>tr>th>div').should('Name','trail 1')
    //cy.get('[data-cy="countryTableLinkButton"]').contains('trail 1')
    // cy.get('tbody>tr>td').should('have.text',' trial  1')
    // cy.get('tbody>tr').should('have.length',1)   
})

//SCENARIO-5 Delete country without regions
When('I clicked three dots in the end of row in column Action for country Test a context menu with options {string} and {string} shows',(button1,button2)=>
{
   
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', ' trial ')
    cy.get('[data-cy=countryTableEditMenu]').click()
    
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})

And('I choose "Delete" a content appeared {string}and{string}',(button1,button2)=>
{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(button1).should('be.visible')
    cy.get('.hSeVfH').contains(button2).should('be.visible')
    // cy.get('[data-cy="countryTableDeleteButton"]').click()
    // cy.get('[class="sc-AxmLO cizzDZ"]',{timeout:10000}).contains(button1).should('be.visible')
    // cy.get('[class="sc-AxmLO hSeVfH"]',{timeout:10000}).contains(button2).should('be.visible')

})
And('clicked button Delete',()=>
{
    cy.get('[data-cy=countryDeleteDialogConfirmButton]').click()
    // cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()
    // cy.get('[data-cy=countryDeleteDialogConfirmButton]',{timeout:10000}).click()
    //cy.get('[data-cy="countryDeleteDialogConfirmButton"],{timeout:10000}).contains(button).click()

})
Then('I see tooltip {string}and{string}',(headerMsg,bodyMsg)=>
{
utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
// Scenario: Add, edit and delete regions
//scenario : Add country
Given('I am logged in', () => 
{
    cy.url().should('include', 'admin/countries')
})
When('I clicked button {string} a modal appeared', (button) => 
{
    cy.contains(button, { timeout: 10000 }).click()
})
And('I create new country with following details:', (datatable) =>
{
   
    datatable.hashes().forEach((ele: any) => {

        for (let propName in ele) {
            switch (propName) {
                case 'CountryName':
                    utilityHelper.setInputValue('[data-cy="countryFormInputName"]',ele[propName])
                    break;

                case 'CountryCode':
                    utilityHelper.setInputValue('[data-cy="countryFormInputCountryCode"]',ele[propName])
                    break;

                case 'Currency':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectCurrency"]', ele[propName])
                   
                    break;

                case 'Whichunitsystemisusing?':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectIsDefaultMetric"]',ele[propName])
                    break;

                case 'Windspeedunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectWindSpeedUnit"] ',ele[propName])
                    break;

                case 'Precipitationamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectPrecipitationAmountUnit"] ',ele[propName])
                    break;

                case 'Evapotranspirationunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectEvapotranspirationRefUnit"] ',ele[propName])
                    break;

                case 'Qpfsnowamountunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectQpfSnowAmountUnit"] ',ele[propName])
                    break;

                case 'Temperatureunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectTemperatureUnit"] ',ele[propName])
                    break;

                case 'Dewpointunit':
                    utilityHelper.setSingleDropdownValue('[data-cy="countryFormSelectDewPointUnit"]',ele[propName])
                    break;

                case 'ProductSetCode(Optional)':
                    utilityHelper.setInputValue('[data-cy="countryFormInputProductSetCode"]',ele[propName])
                    break;

                case 'Solutions(Optional)':
                    utilityHelper.setMultiDropdownValue('[data-cy="countryFormSelectApplicationTags"]',ele[propName],false)
                    break;

                default:
                    break;
            }
        }
    })
})
And('I clicked button {string}', (button) => 
{
    cy.contains(button).click()
})
 Then('I see tooltip{string}and{string}', (headerMsg, bodyMsg) =>
{

    utilityHelper.verifyAlertToolTips(headerMsg, bodyMsg)
})

And('in countryTable should be added row with following data:', (datatable) =>
{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial')
    utilityHelper.verifyTableData(datatable, 'countryTable')
})
//  Scenario: Add region to Country trial 1
When ('I clicked on trial 1 name of country in column name in countries list a list with regions are loaded',()=>
{
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial 1')
    cy.get('[data-cy="countryTableLinkButton"] >.sc-AxheI').click()
})
And('I clicked button {string} a modal appeared',(button)=>
{
    cy.get('[data-cy="addRegionButton"]').contains(button).click()
})
And ('I typed All in field {string}',(button)=>{
    cy.get('label').contains(button)
    cy.get('[data-cy="regionFormInputName"]').type('All')
})
And ('I clicked button {string}',(button)=>
{
    cy.contains(button).click()
})
Then ('I see tooltip {string}and{string}',(headerMsg,bodyMsg)=>
{
     utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
And('in regionTable should be added row with following data:',(datatable)=>
{
       utilityHelper.verifyTableData(datatable,'regionTable')
 
})

// Scenario: Add duplicated region to Country trial 1
When ('I clicked on trial 1  again name of countryTable in column name in countries list a list with given regions are loaded again.',()=>
{
        cy.get('[id="3"]').click()
        utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial 1')
        cy.get('[data-cy="countryTableLinkButton"]> .sc-AxheI').click()
})
And('I clicked button {string} a modal appeared',(button)=>
{
        cy.get('[data-cy="addRegionButton"]').contains(button).click()
})
And ('I typed All in field {string}',(button)=>
{
        cy.get('label').contains(button)
        cy.get('[data-cy="regionFormInputName"]').type('All')
})
 And ('I clicked button {string}',(button)=>
{
    cy.contains(button).click
})
Then ('An error message {string} displays under field Region Name',(button)=>{
    cy.get('.eKWJxm',{timeout:11000}).contains(button).should('be.visible')
})
And ('a modal is open, should not save the region with name All',()=>{
    cy.get('[data-cy=regionAddFormButtonClose]').click()
    //cy.get('[data-cy=regionFormInputName]').contains('All')
 //cy.get('.eKWJxm').contains('All')
})

// # Scenario: Edit region to Country Test 1 without save changes
When ('I clicked on trial 1 name of countryTable in column name in countries list a list with regions are loaded',()=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trail 1')
    cy.get('[data-cy="countryTableLinkButton"] >.sc-AxheI').click()
})
And ('I clicked on three dots in end of row  a context menu with options {string} and {string} shows',(button1,button2)=>{
  cy.get('[data-cy="regionTableEditMenu"]').click()
  cy.get('[data-cy="regionTableEditButton"]').contains(button1)
  cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose {string} a modal appeared',(button)=>{
    cy.get('[data-cy="regionTableEditButton"]').contains(button).click()
})
And ('I typed  {string} in field Region Name',(button)=>{
    //cy.get('label').contains(button)
    cy.get('[data-cy="regionFormInputName"]').clear().type(button)
})
And ('I clicked button "X" in right up corner of modal',()=>{
  cy.get('.bTIjTR').click()
})
Then ('modal disappeared, should not changes any data for region All',()=>{
    cy.get('tbody>tr').should('have.length',1)
})
//  Scenario: Edit region to Country Test 1 and save changes
When ('I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded',()=>{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name','trial 1')
    cy.get('[data-cy="countryTableLinkButton"]').click()
})
And ('I clicked on three dots in end of row  a context menu with options {string} and {string} shows',(button1,button2)=>{
  cy.get('[data-cy="regionTableEditMenu"]').click()
  cy.get('[data-cy="regionTableEditButton"]').contains(button1)
  cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose {string} a modal appeared',(button)=>{
    cy.get('[data-cy="regionTableEditButton"]').contains(button).click()
})
And ('I typed {string} in field Region Name',(button)=>{
    //cy.get('label').contains(button)
    cy.get('[data-cy="regionFormInputName"]').clear().type(button)
})
And ('I clicked button {string}',(button)=>{
    cy.contains(button).click()
})
Then ('I see tooltip {string}and{string}',(headerMsg,bodyMsg)=>{
    utilityHelper.verifyAlertToolTips(headerMsg,bodyMsg)
})
And ('And in regionTable should be added row with following data:',(datatable)=>{
utilityHelper.verifyTableData(datatable,'regionTable')
})

//  Scenario: Delete country with added regions
When ('I clicked three dots in the end of row in column Action for country trial a context menu with options {string} and {string} shows',(button1,button2)=>
{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', 'trial')
    cy.get('[data-cy=countryTableEditMenu]').click()
    cy.get('[data-cy="countryTableEditButton"]').contains(button1).should('be.visible')
    cy.get('[data-cy="countryTableDeleteButton"]').contains(button2).should('be.visible')
})
And('I choose {string}',(button)=>{
    cy.contains(button).click
})
And('a content appeared {string}and{string}',(button1,button2)=>
{
    cy.get('[data-cy="countryTableDeleteButton"]').click()
    cy.get('.cizzDZ').contains(button1).should('be.visible')
    cy.get('.hSeVfH').contains(button2).should('be.visible')
   
})
And('clicked button {string}',(button)=>{
    cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()
})

Then('modal disappeared, should not changes anything in data or row for country  trial 1',()=>
{
    cy.get('tbody > .sc-fzoWqW > :nth-child(1)').should('be.visible')
   // cy.get('thead>tr>th>div').should('Name','trail 1')
    //cy.get('[data-cy="countryTableLinkButton"]').contains('trail 1')
    // cy.get('tbody>tr>td').should('have.text',' trial  1')
    // cy.get('tbody>tr').should('have.length',1)   
})

//  Scenario: Denied deleting of Region in country Test 1
When ('I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded',()=>
{
    cy.get('[id="3"]').click()
    utilityHelper.searchTableBasedOnColumn('countryTable','Name', 'trial')
    cy.get('[data-cy="countryTableLinkButton"] >.sc-AxheI').click()
})
And ('I clicked on three dots in end of row  a context menu with options {string} and {string} shows',(button1,button2)=>
{
        cy.get('[data-cy="regionTableEditMenu"]').click()
        cy.get('[data-cy="regionTableEditButton"]').contains(button1)
        cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose "Delete" a content appeared {string}and{string}',(button1,button2)=>{
    cy.get('[data-cy="regionTableDeleteButton"]').click()
        cy.get('.cizzDZ').contains(button1).should('be.visible')
        cy.get('.hSeVfH',{timeout:1000}).contains(button2).should('be.visible')
})
And ("I choose button 'Don't delete'",()=>{
    cy.get('[data-cy="regionDeleteDialogCancelButton"]').click()
})
Then ('content disappeared, should not delete region "All Test" or changed any data for row in table',()=>{
    cy.get('tbody > .sc-fzoWqW > :nth-child(1)').should('be.visible')   
})
//  Scenario: Delete Region in country Test 1
When ('I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded',()=>
{
    cy.get('[data-cy="countryTableLinkButton"] >.sc-AxheI').click()
})
And ('I clicked on three dots in end of row  a context menu with options {string} and {string} shows',(button1,button2)=>
{
        cy.get('[data-cy="regionTableEditMenu"]').click()
        cy.get('[data-cy="regionTableEditButton"]').contains(button1)
        cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose "Delete" a content appeared {string}and{string}',(button1,button2)=>{
    cy.get('[data-cy="regionTableDeleteButton"]').click()
        cy.get('.cizzDZ').contains(button1).should('be.visible')
        cy.get('.hSeVfH',{timeout:1000}).contains(button2).should('be.visible')
})
And ('I choose button "Delete"',()=>{
    cy.get('[data-cy="regionDeleteDialogConfirmButton"]').click()
 })
// Then ('I see tooltip "Region deleted The redion has been removed.The region can anyway be added again."',()=>{

// })

// Scenario: Delete region with added crpos in it
When ('I clicked on Brazil name of countrytable in column name in countries list a list with regions are loaded',()=>{
    cy.get('[id="3"]').click()
utilityHelper.searchTableBasedOnColumn('countryTable','Name','Brazil')

})
And ('I clicked on three dots in end of row for region Bahia a context menu with options {string} and {string} shows',(button1,button2)=>{
   //cy.get('tbody>tr').contains(Msg).should('be.visible')
//    cy.get('[data-cy="regionTableEditMenu"]').click()
cy.get('[data-cy=countryTableLinkButton] > .sc-AxheI').click()
cy.get('tbody > :nth-child(4) > :nth-child(1)').contains( 'Bahia')
cy.get(':nth-child(4) > .fKVxZa >div >[data-cy="regionTableEditMenu"]').click()
        cy.get('[data-cy="regionTableEditButton"]').contains(button1)
        cy.get('[data-cy="regionTableDeleteButton"]').contains(button2)
})
And ('I choose "Delete"a content appeared {string}and{string}',(headerMsg,bodyMsg)=>{
  cy.get('[data-cy="regionTableDeleteButton"]').contains('Delete').click()
  cy.get('.cizzDZ').contains(headerMsg).should('be.visible')
        cy.get('.fQYnnF').contains(bodyMsg).should('be.visible')
})
And ('I clicked button {string}',(button)=>{
    cy.get('[data-cy="countryDeleteDialogCancelButton"]').contains(button).click()
})

Then('content disappeared, should not delete region or changed any data for row region Bahia',()=>
{
    cy.get('tbody > .sc-fzoWqW ').contains('Bahia')
})

