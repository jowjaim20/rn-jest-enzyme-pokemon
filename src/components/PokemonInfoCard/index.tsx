import { Component } from "react";
import { View, Text, Image } from "react-native";

export default class PokemonInfoCard extends Component<PokemonInfo> {
  constructor(props: PokemonInfo) {
    super(props);
  }

  render() {
    const { name, height, sprites } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: sprites.front_default }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 2 }}>Name:</Text>
          <Text style={{ textTransform: "capitalize" }} testID="pokemon-name">
            {name}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>Height:</Text>
          <Text style={{ textTransform: "capitalize" }} testID="pokemon-height">
            {height}
          </Text>
        </View>
      </View>
    );
  }
}
