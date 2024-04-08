Feature: Starting a new game

Scenario: The user wants to go to the game menu
  Given A logged user
  When The user navigates to the game page
  Then The three possible difficulties should appear
