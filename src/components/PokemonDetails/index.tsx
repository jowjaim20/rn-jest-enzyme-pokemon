import { Component } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pages } from "../../../App";
import PokemonInfoCard from "../PokemonInfoCard";

export type PokemonDetailsScreen = NativeStackScreenProps<
  Pages,
  "DetailsScreen"
>;

export type DetailsState = {
  pokemon: PokemonInfo | null;
};

export default class PokemonDetails extends Component<
  PokemonDetailsScreen,
  DetailsState
> {
  constructor(props: PokemonDetailsScreen) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  getDetails = async () => {
    const { route } = this.props;

    const res = await fetch(route.params.url);

    const data = await res.json();

    if (data) {
      this.setState({ pokemon: data });
    }
  };

  componentDidMount() {
    this.getDetails();
  }

  render() {
    const { pokemon } = this.state;

    return (
      <>
        {pokemon ? (
          <PokemonInfoCard {...pokemon} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
          </View>
        )}
      </>
    );
  }
}
