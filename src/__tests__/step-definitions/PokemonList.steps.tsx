import { FlatList } from "react-native";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mockFetch } from "../../utils";
import { pokemonListResponseMock, pokemonListResponseMock2 } from "../../mocks";
import PokemonList, {
  PokemonListProps,
  State,
} from "../../components/PokemonList";
import Search from "../../components/Search";

const feature = loadFeature("./src/__tests__/features/PokemonList.feature");

const nextTick = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

defineFeature(feature, (test) => {
  const props: PokemonListProps = {
    navigation: {
      dispatch: jest.fn(),
    },
    route: {},
  } as unknown as PokemonListProps;

  beforeEach(() => {
    jest.resetModules();
  });

  test("Scenario #1", ({ given, then, when }) => {
    let wrapper: ShallowWrapper<{}, State>;

    given("It renders without crashing", () => {
      window.fetch = mockFetch(pokemonListResponseMock);

      wrapper = shallow(<PokemonList {...props} />);

      expect(wrapper.exists()).toBe(true);
    });

    then("I will see an Input Text where I can search Pokemon", () => {
      const searchComponent = wrapper.find(Search);

      expect(searchComponent.exists()).toBe(true);
    });

    then("I will see a list of pokemon", () => {
      const flatlist = wrapper.find("FlatList").props();

      expect(flatlist.data?.length).toEqual(2);
    });

    when(
      "I scrolldown to the bottom of the list I will see more pokemon",
      async () => {
        window.fetch = mockFetch(pokemonListResponseMock2);

        const flatlist = wrapper.find(FlatList);

        flatlist.simulate("endReached");

        await nextTick();

        wrapper.update();

        const newFlatlist = wrapper.find("FlatList").props();

        expect(newFlatlist.data?.length).toEqual(4);
      },
    );
  });

  test("Scenario #2", ({ when }) => {
    let wrapper: ShallowWrapper<{}, State>;

    when(
      "I scrolldown to the bottom of the list and there is no next url I will see the same value",
      async () => {
        window.fetch = mockFetch(pokemonListResponseMock2);

        wrapper = shallow(<PokemonList {...props} />);

        const flatlist = wrapper.find(FlatList);

        flatlist.simulate("endReached");

        await nextTick();

        wrapper.update();

        const newFlatlist = wrapper.find("FlatList").props();

        expect(newFlatlist.data?.length).toEqual(2);
      },
    );
  });
});
