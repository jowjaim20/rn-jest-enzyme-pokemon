import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Component, ReactNode } from "react"
import { Pressable, Text } from "react-native"
import { PokemonListScreen } from "../PokemonList"

export interface PokemonCardProps extends Result, PokemonListScreen {}

export default class PokemonCard extends Component<
  PokemonCardProps,
  { title: string }
> {
  constructor(props: PokemonCardProps) {
    super(props)
  }

  navigateToDetailsScreen = () => {
    const { navigation, url } = this.props
    navigation.navigate("DetailsScreen", { url })
  }

  render() {
    const { name } = this.props
    return (
      <Pressable onPress={this.navigateToDetailsScreen}>
        <Text>{name}</Text>
      </Pressable>
    )
  }
}
