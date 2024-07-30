import { Text } from "react-native";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import PokemonDetails, {
  DetailsState,
  PokemonDetailsScreen,
} from "../../components/PokemonDetails";
import { mockFetch } from "../../utils";
import { pokemonMock } from "../../mocks";
import PokemonInfoCard from "../../components/PokemonInfoCard";

const feature = loadFeature("./src/__tests__/features/PokemonDetails.feature");

const nextTick = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

defineFeature(feature, (test) => {
  const props: PokemonDetailsScreen = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {
      params: {
        url: "test-url",
      },
    },
  } as unknown as PokemonDetailsScreen;

  beforeEach(() => {
    jest.resetModules();
  });

  test("Scenario #1", ({ given, then }) => {
    let wrapper: ShallowWrapper<{}, DetailsState>;

    given("It renders without crashing", () => {
      window.fetch = mockFetch(pokemonMock);

      wrapper = shallow(<PokemonDetails {...props} />);

      expect(wrapper.exists()).toBe(true);
    });

    then("A loading screen will appear", () => {
      const loading = wrapper.find(Text);
      const text = loading.text();

      expect(text).toBe("Loading...");
    });
  });

  test("Scenario #2", ({ given, then }) => {
    let wrapper: ShallowWrapper<{}, DetailsState>;

    given("It renders without crashing", () => {
      window.fetch = mockFetch(pokemonMock);

      wrapper = shallow(<PokemonDetails {...props} />);

      expect(wrapper.exists()).toBe(true);
    });

    then("after fetching it will render a new Pokemon", async () => {
      await nextTick();

      const pokemonInfoCard = wrapper.find(PokemonInfoCard);

      expect(pokemonInfoCard.exists()).toBe(true);
    });
  });
});
