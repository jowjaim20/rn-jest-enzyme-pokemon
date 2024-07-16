Feature: Testing PokemonList Component

Scenario: Render Pokemon List
    Given It renders without crashing
    Then I will see an Input Text where I can search Pokemon
    Then I will see a list of pokemon
    When I scrolldown to the bottom of the list I will see more pokemon
    When I scrolldown to the bottom of the list and there is no next url I will see the same value


    