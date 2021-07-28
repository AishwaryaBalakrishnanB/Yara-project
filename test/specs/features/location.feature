Feature: Locations and regions

    Add, edit and delete country

    Add, edit and delete regions

    Will described in one place because there are some restrictions when delete country with added regions
    
    ​

    Background:

        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance

        And clicked to button "Global settings"

        And clicked "Locations"

    # Scenario: Edit Country and save changes
    #     Given I am logged in as Global admin
    #     When I clicked three dots in the end of row/in column Action/ for country Test a context menu with options "Edit" and "Delete" shows
    #     And I choose "Edit" a modal appered with following data:


    #         | CountryName | CountryCode | Currency | Whichunitsystem is using? | Windspeedunit | Precipitationamountunit | Evapotranspiration unit | Qpf snow amount unit | Temperature unit | Dew point unit | Product Set Code (Optional) | Solutions (Optional) |
    #         | Test         | TS           | AFN      | Metric                       | km/h            | mm                        | mm                      | cm                   | °C               | °C             | 33                          | CNP                  |

    #     And I changed data in all fields:

    #         | CountryName | CountryCode | Currency | Which unit system is using ? | Wind speed unit | Precipitation amount unit | Evapotranspiration unit | Qpf snow amount unit | Temperature unit | Dew point unit | Product Set Code (Optional) | Solutions (Optional) |
    #         | Test 1       | TP           | EUR      | Imperial                     | mph             | inch                      | inch                    | inch                 | °F               | °F             | 34                          | CNP, Ayra            |
    #     And I clicked button "Save"
    #     Then I see tooltip text "Changes saved The changes done to the table row have been successfully saved."
    #     And data for country should be updated in row

    #         | Name   | Country Code | Currency Code | Product Set Code | Solutions | Translation key | Last mod. | Actions |
    #         | Test 1 | TP           | BGN           | 34               | CNP Ayra  | country.test_1  | ?         | ...     |


​