import React, { Component } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import PokemonList from "./src/components/PokemonList"
import PokemonDetails from "./src/components/PokemonDetails"

export type Pages = {
  ListScreen: undefined
  DetailsScreen: { url: string }
}

const RootStack = createStackNavigator<Pages>()
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="ListScreen">
          <RootStack.Screen
            name="ListScreen"
            component={PokemonList}
            options={{
              title: "Pokedex",
              headerStyle: { backgroundColor: "#CC0000" },
              headerTintColor: "white",
            }}
          />

          <RootStack.Screen
            name="DetailsScreen"
            component={PokemonDetails}
            options={{
              headerStyle: { backgroundColor: "#CC0000" },
              headerTitleStyle: { color: "white", textTransform: "capitalize" },
              headerTintColor: "white",
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    )
  }
}

