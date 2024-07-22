import { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pages } from "../../../App";
import PokemonCard from "../PokemonCard";
import Search from "../Search";

export type PokemonListScreen = NativeStackScreenProps<Pages, "ListScreen">;

export type State = {
  data: Data;
  all: Data;
};

export interface PokemonListProps extends PokemonListScreen {}

export default class PokemonList extends Component<PokemonListProps, State> {
  constructor(props: PokemonListProps) {
    super(props);
    this.state = {
      all: { count: 0, next: null, previous: null, results: [] },
      data: { count: 0, next: null, previous: null, results: [] },
    };
  }

  getData = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0",
    );

    const data = await res.json();
    this.setState({ data });
  };

  getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000");

    const data = await res.json();
    this.setState({ all: data });
  };

  getNextData = async () => {
    const { data: data1 } = this.state;

    if (!data1.next) return;

    const res = await fetch(data1.next);

    const data = await res.json();

    if (data) {
      this.setState({
        data: {
          count: data.count + this.state.data.count,
          next: data.next,
          previous: data.previous,
          results: [...this.state?.data.results, ...data.results],
        },
      });
    }
  };

  componentDidMount() {
    this.getData();
    this.getAllPokemons();
  }

  render() {
    if (!this.state?.data || !this.state?.all) return null;
    const { all, data } = this.state;
    return (
      <View>
        <Search {...this.props} all={all} />
        <FlatList
          data={data.results}
          renderItem={({ item }) => (
            <PokemonCard key={item.name} {...item} {...this.props} />
          )}
          onEndReached={this.getNextData}
        />
      </View>
    );
  }
}
