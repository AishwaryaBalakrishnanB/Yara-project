Feature:Units
    Add, edit and delete Units

    Background:
        Given Logged as user with role Global admin and role Global settings and PolarisMaintenance
        And clicked  button"Global settings"
        And clicked "Crop settings" submenus "Crops", "Units", "Unit Conversations", "Growth Scales"," Soil Types","Crop Residue Management","Variety Correction Factors" became visible
        And clicked button"Units"
        Given I am logged in cropSettings

    # Note:The scenarios have to be executed in same order as described in file

    Scenario: Add unit

        And I clicked button "Add Unit"
        And I create new Unit with following details:
            | Unit Name | Tags       | Country (Optional) |
            | Test      | DemandUnit | Antarctica         |
        And clicked button "Save" in ADD units
        Then I see tooltip "Unit added!"and"The new unit has been successfully added to the global list."
        And in Table should be added row with following data:
            | Name | Tags       | Last mod. | Actions |
            | Test | DemandUnit | ?         | ···     |

    Scenario: Edit unit without saving changes

        When I clicked on three dots in end of row for unit Test a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" a modal appeared with following data:
            | Name   | Tags       | Last mod. | Actions |
            | Test 1 | DemandUnit | ?         | ···     |
        And I changed data in all fields cropSettings:
            | Unit Name | Tags       | Country (Optional)             |
            | Test  2   | DemandUnit | Antarctica,Timor-Leste,Andorra |
        And I clicked button "<X>" in uper right corner of modal unit
        Then a modal disappeared , no changed done to row and data
            | Name   | Tags       | Last mod. | Actions |
            | Test 1 | DemandUnit | ?         | ···     |
    Scenario: Edit unit with saving changes

        When I clicked on three dots in end of row for unit Test a context menu with options "Edit" and "Delete" shows
        And I clicked "Edit" a modal appeared with following data:
            | Unit Name | Tags       | Country (Optional) |
            | Test      | DemandUnit | Antarctica         |
        And I changed data in all fields cropSettings:
            | Unit Name | Tags       | Country (Optional)     |
            | Test 1    | DemandUnit | Antarctica,Timor-Leste |
        And clicked button "Save" in ADD units
        Then I see tooltip "Changes saved"and"The changes done to the table row have been successfully saved."
        And data for Unit row should be updated:
            | Name   | Tags       | Last mod. | Actions |
            | Test 1 | DemandUnit | ?         | ···     |
    Scenario:Denied  Deleting of unit

        When I clicked on three dots in end of row for unit Test a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" a content appered "Please note!"and"Are you sure you want to delete Test 1? The action cannot be reverted." unit
        And clicked button "Don't delete" cropSettings
        Then modal disappeared and deleting is not done. In table still stay row
            | Name   | Tags            | Last mod. | Actions |
            | Test 1 | DemandUnit   Al | ?         | ···     |

    Scenario:Delete unit

        When I clicked on three dots in end of row for unit Test a context menu with options "Edit" and "Delete" shows
        And I clicked "Delete" a content appered "Please note!"and"Are you sure you want to delete Test 1? The action cannot be reverted." unit
        And  I clicked button "Delete" cropSettings
        Then I see tooltip "Unit deleted"and"The unit has been removed. The unit can anyway be added again."

    Scenario: Delete unit when is used in Unit Conversations
     When I clicked on three dots in end of row for unit conversation a context menu with options "Edit" and "Delete" shows
        # When I clicked on three dots in end of row for Unit "kg/ha" a context menu with options "Edit" and "Delete" shows
        And clicked "Delete" a content appeared "Please note!"and"The unit cannot be deleted as long as it is used in unit conversions, Crop nutrition plan data. Edit the related data and try again." 
        And clicked button "Ok" units
        Then a modal disappeared , no changed done to row and data unit conversation



