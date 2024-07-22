import { Component } from "react";
import { FlatList, TextInput, View } from "react-native";
import { PokemonListScreen } from "../PokemonList";
import PokemonCard from "../PokemonCard";

export interface SearchProps extends PokemonListScreen {
  all: Data;
}

type State = { pokemonName: string; searchedPokemons: Data["results"] };

export default class Search extends Component<SearchProps, State> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { pokemonName: "", searchedPokemons: [] };
  }

  onChangeText = (text: string) => {
    const { all } = this.props;
    const filtered = all.results.filter((pokemon) =>
      pokemon.name.includes(text),
    );

    this.setState({ pokemonName: text, searchedPokemons: filtered });
  };

  render() {
    const { searchedPokemons, pokemonName } = this.state;

    return (
      <View style={{ position: "relative", zIndex: 999 }}>
        <TextInput value={pokemonName} onChangeText={this.onChangeText} />
        {pokemonName !== "" ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              zIndex: 999,
              left: 0,
              top: 20,
              padding: 10,
              width: 200,
              borderRadius: 8,
              marginLeft: 4,
            }}>
            <FlatList
              contentContainerStyle={{ justifyContent: "center" }}
              data={searchedPokemons}
              renderItem={({ item }) => (
                <PokemonCard {...this.props} {...item} />
              )}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
