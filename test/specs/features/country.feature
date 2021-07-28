Feature: Locations and regions
    Add, edit and delete country
    Add, edit and delete regions
    Will described in one place because there are some restrictions when delete country with added regions


    Background:
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance

        And clicked  button"Global settings"
        And clicked  button"Locations"

    Scenario:  Add, edit and delete country
        #scenario : Add country
        Given I am logged in
        When I clicked button "Add Country" a modal appeared
        And I create new country with following details:
            | CountryName | CountryCode | Currency | Whichunitsystemisusing? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial       | TS          | AFN      | Metric                  | km/h          | mm                      | mm                     | cm                | °C              | °C           | 33                       | CNP                 |

        And I clicked button "Save"

        Then I see tooltip"Country added!"and"The new country has been successfully added to the global list."
        And in countryTable should be added row with following data:
            | CountryName | CountryCode | CurrencyCode | ProductSetCode | Solutions | Translationkey | Lastmod. | Actions |
            | trial       | TS          | AFN          | 33             | CNP       | country.trial  | ?        | ···     |
        #  Scenario:Edit Country without save the data

        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Edit" a modal appeared with following data:
            | Country Name | CountryCode | Currency | Whichunitsystemisusing ? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial        | TS          | AFN      | Metric                   | km/h          | mm                      | mm                     | cm                | °C              | °C           | 33                       | CNP                 |
        And I changed data in all fields:
            | Country Name | CountryCode | Currency | Whichunitsystemisusing ? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial 1      | TP          | EUR      | Imperial                 | mph           | inch                    | inch                   | inch              | °F              | °F           | 34                       | Ayra                |
        And I clicked button "<X>" in right up corner of modal
        Then modal disappeared, should not changes any data for country Test

        #  Scenario:Edit Country and save changes

        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Edit" a modal appeared with following data:
            | CountryName | CountryCode | Currency | Whichunitsystemisusing ? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial       | TS          | AFN      | Metric                   | km/h          | mm                      | mm                     | cm                | °C              | °C           | 33                       | CNP                 |

        And I changed data in all fields:
            | CountryName | CountryCode | Currency | Whichunitsystemisusing ? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial 1     | TP          | EUR      | Imperial                 | mph           | inch                    | inch                   | inch              | °F              | °F           | 34                       | CNP,Ayra            |
        And I clicked button "Save"
        Then I see tooltip"Changes saved"and"The changes done to the table row have been successfully saved."
        And data for country should be updated in row:
            | Name    | CountryCode | CurrencyCode | ProductSetCode | Solutions | Translationkey  | Last mod. | Actions |
            | trial 1 | TP          | EUR          | 34             | CNPAyra   | country.trial_1 | ?         | ···     |

        #  Scenario: Denied deleting of country without regions
        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete trial 1? The action cannot be reverted."
        And clicked button "Don't delete"
        Then modal disappeared, should not changes anything in data or row for country  trial 1

        #  Scenario: Delete country without regions
        When I clicked three dots in the end of row in column Action for country Test a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete trial 1? The action cannot be reverted."
        And clicked button Delete
        Then I see tooltip "Country deleted"and"The country has been removed. The country can anyway be added again."

    Scenario: Add, edit and delete regions

        # scenario : Add country
        Given I am logged in
        When I clicked button "Add Country" a modal appeared
        And I create new country with following details:
            | CountryName | CountryCode | Currency | Whichunitsystemisusing? | Windspeedunit | Precipitationamountunit | Evapotranspirationunit | Qpfsnowamountunit | Temperatureunit | Dewpointunit | ProductSetCode(Optional) | Solutions(Optional) |
            | trial 1     | TS          | AFN      | Metric                  | km/h          | mm                      | mm                     | cm                | °C              | °C           | 33                       | CNP                 |

        And I clicked button "Save"
        Then I see tooltip"Country added!"and"The new country has been successfully added to the global list."
        And in countryTable should be added row with following data:
            | CountryName | CountryCode | CurrencyCode | ProductSetCode | Solutions | Translationkey  | Lastmod. | Actions |
            | trial 1     | TS          | AFN          | 33             | CNP       | country.trial_1 | ?        | ···     |
        # Scenario: Add region to Country trial 1

        When I clicked on trial 1 name of country in column name in countries list a list with regions are loaded
        And I clicked button "Add region" a modal appeared
        And I typed All in field "Region Name"
        And I clicked button "Save"
        Then I see tooltip "Region added!"and"The new region has been successfully added to the global list."
        And in regionTable should be added row with following data:
            | Name | Translation key   | Last mod. | Actions |
            | All  | region.test_1_all | ?         | ···     |

        # Scenario: Add duplicated region to Country trial 1
        When I clicked on trial 1  again name of countryTable in column name in countries list a list with given regions are loaded again.
        And I clicked button "Add region" a modal appeared
        And I typed All in field "Region Name"
        And I clicked button "Save"
        Then An error message "Name All is used for another Region" displays under field Region Name
        And a modal is open, should not save the region with name All

    # Scenario: Edit region to Country Test 1 without save changes
        When I clicked on trial 1 name of countryTable in column name in countries list a list with regions are loaded
        And I clicked on three dots in end of row  a context menu with options "Edit" and "Delete" shows
        And I choose "Edit" a modal appeared
        And I typed  "Ala Bala" in field Region Name
        And I clicked button "X" in right up corner of modal
        Then modal disappeared, should not changes any data for region All

        # Scenario: Edit region to Country Test 1 and save changes

        When I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded
        And I clicked on three dots in end of row  a context menu with options "Edit" and "Delete" shows
        And I choose "Edit" a modal appeared
        And I typed "All Test" in field Region Name
        And I clicked button "Save"
        Then I see tooltip "Changes saved"and"The changes done to the table row have been successfully saved."
        And And in regionTable should be added row with following data:
            | Name     | Translation key        | Last mod. | Actions |
            | All Test | region.test_1_all_test | ?         | ···     |

        #  Scenario: Delete country with added regions
        When I clicked three dots in the end of row in column Action for country trial a context menu with options "Edit" and "Delete" shows
        And I choose "Delete"
        And a content appeared "Please note!"and"The country cannot be deleted as it has regions."
        And clicked button "Ok"
        Then modal disappeared, should not changes anything in data or row for country  trial 1



        #  Scenario: Denied deleting of Region in country Test 1
        When I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded
        And I clicked on three dots in end of row  a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete All Test? The action cannot be reverted."
        And I choose button 'Don't delete'
        Then content disappeared, should not delete region "All Test" or changed any data for row in table


        # Scenario: Delete Region in country Test 1
        When I clicked on trial 1 name of countrytable in column name in countries list a list with regions are loaded
        And I clicked on three dots in end of row  a context menu with options "Edit" and "Delete" shows
        And I choose "Delete" a content appeared "Please note!"and"Are you sure you want to delete All Test? The action cannot be reverted."
        And I choose button "Delete"
        # Then I see tooltip "Region deleted The redion has been removed.The region can anyway be added again."and the row is removed from list Country Regions for country Test 1

        # Scenario: Delete region with added crpos in it

        When I clicked on Brazil name of countrytable in column name in countries list a list with regions are loaded
        And I clicked on three dots in end of row for region Bahia a context menu with options "Edit" and "Delete" shows
        And I choose "Delete"a content appeared "Please note!"and"The country cannot be deleted as long as it is used in local crops. Edit the related data and try again."
        And I clicked button "Ok"
        Then content disappeared, should not delete region or changed any data for row region Bahia







