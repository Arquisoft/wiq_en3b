Feature: Starting a new game

Scenario: The user wants to go to the game menu
  Given A logged user
  When The user navigates to the game page
  Then The three possible difficulties should appear

Scenario: The user wants to start an easy game
  Given A logged user
  When The user navigates to the game page
  And The user press the Easy button
  Then The quiz game should begin

Scenario: The user wants to start a medium game
  Given A logged user
  When The user navigates to the game page
  And The user press the Medium button
  Then The quiz game should begin

Scenario: The user wants to start a hard game
  Given A logged user
  When The user navigates to the game page
  And The user press the Hard button
  Then The quiz game should begin