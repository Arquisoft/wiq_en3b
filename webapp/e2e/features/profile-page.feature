Feature: Profile Management

  Scenario: User updates profile information
    Given The user is logged in
    When The user navigates to the profile page
    Then The user's profile information should be displayed
    When The user updates the biography text
    And The user changes the profile image
    Then The profile should be updated with the new information