import { Image } from "react-native";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { DetailsState } from "../../components/PokemonDetails";
import { pokemonMock } from "../../mocks";
import PokemonInfoCard from "../../components/PokemonInfoCard";

const feature = loadFeature("./src/__tests__/features/PokemonInfoCard.feature");

defineFeature(feature, (test) => {
  const props: PokemonInfo = pokemonMock;

  test("Render PokemonInfoCard", ({ given, then }) => {
    let wrapper: ShallowWrapper<{}, DetailsState>;

    given("It renders without crashing", () => {
      wrapper = shallow(<PokemonInfoCard {...props} />);

      expect(wrapper.exists()).toBe(true);
    });

    then("I will see all the details of the pokemon", () => {
      const image = wrapper.find(Image);

      expect(image.props().source).toEqual({
        uri: props.sprites.front_default,
      });

      const name = wrapper.findWhere(
        (node) => node.prop("testID") === "pokemon-name",
      );

      expect(name.text()).toBe(props.name);

      const height = wrapper.findWhere(
        (node) => node.prop("testID") === "pokemon-height",
      );

      expect(height.text()).toBe(props.height.toString());
    });
  });
});
