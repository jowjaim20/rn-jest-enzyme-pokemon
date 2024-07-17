import { TextInput } from "react-native";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { pokemonListResponseMock, pokemonListResponseMock1 } from "../../mocks";
import { State } from "../../components/PokemonList";
import Search, { SearchProps } from "../../components/Search";

const feature = loadFeature("./src/__tests__/features/Search.feature");

defineFeature(feature, (test) => {
  const props: SearchProps = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {},
    all: pokemonListResponseMock,
  } as unknown as SearchProps;

  const wrapper: ShallowWrapper<{}, State> = shallow(<Search {...props} />);

  beforeEach(() => {
    jest.resetModules();
  });

  test("Render Search", ({ given, then, when }) => {
    given("It renders without crashing", () => {
      expect(wrapper.exists()).toBe(true);
    });

    then(
      "Input text will contain empty string and I will fill out a value",
      () => {
        let input = wrapper.find(TextInput);

        expect(input.props().value).toEqual("");

        input.simulate("changeText", "bulbasaur");

        input = wrapper.find(TextInput);

        expect(input.props().value).toEqual("bulbasaur");
      },
    );

    then("It will render only the pokemon that contains the name", () => {
      const flatlist = wrapper.find("FlatList").props();

      expect(flatlist.data?.length).toEqual(1);
    });
  });
});
