import { Component } from "react"
import { View, Text, Image } from "react-native"

export default class PokemonInfoCard extends Component<PokemonInfo> {
  constructor(props: PokemonInfo) {
    super(props)
  }

  render() {
    const { name, height, sprites } = this.props
    return (
      <View>
        <Text testID="pokemon-name">{name}</Text>
        <Text testID="pokemon-height">{height}</Text>

        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: sprites.front_default }}
        />
      </View>
    )
  }
}
