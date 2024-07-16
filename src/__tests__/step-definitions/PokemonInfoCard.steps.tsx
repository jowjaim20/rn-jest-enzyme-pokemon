import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { Pressable, Text, Image } from "react-native"
import PokemonDetails, {
  DetailsState,
  PokemonDetailsScreen,
} from "../../components/PokemonDetails"
import { mockFetch } from "../../utils"
import { pokemonMock } from "../../mocks"
import PokemonInfoCard from "../../components/PokemonInfoCard"

const feature = loadFeature("./src/__tests__/features/PokemonInfoCard.feature")

defineFeature(feature, (test) => {
  const props: PokemonInfo = pokemonMock

  test("Render PokemonInfoCard", ({ given, then, when }) => {
    let wrapper: ShallowWrapper<{}, DetailsState>
    wrapper = shallow(<PokemonInfoCard {...props} />)

    given("It renders without crashing", () => {
      expect(wrapper.exists()).toBe(true)
    })

    then("I will see all the details of the pokemon", () => {
      const image = wrapper.find(Image)
      expect(image.props().source).toEqual({ uri: props.sprites.front_default })

      const name = wrapper.findWhere(
        (node) => node.prop("testID") === "pokemon-name",
      )
      expect(name.text()).toBe(props.name)

      const height = wrapper.findWhere(
        (node) => node.prop("testID") === "pokemon-height",
      )
      expect(height.text()).toBe(props.height.toString())
    })
  })
})
