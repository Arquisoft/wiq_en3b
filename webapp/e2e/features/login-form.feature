Feature: A user logging in

Scenario: Registered user logs in successfully
  Given A registered user
  When I fill the data in the form and press submit
  Then A confirmation message should be shown in the screen

  Scenario: Registered user logs in with incorrect password
  Given A registered user
  When I fill the data in the form with wrong password and press submit
  Then An error message is displayed