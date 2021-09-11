@include
Feature: Basic users management

    As an authorized user
    I would like to be able to manage system users
    To perform day-to-day tasks

Scenario: Getting users list should be successful
    Given I am an authorized user
    When I ask to see system users
    Then The system users are retrieved successfully
