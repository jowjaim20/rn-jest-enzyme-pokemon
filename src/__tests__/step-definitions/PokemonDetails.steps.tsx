import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import { Pressable, Text } from "react-native"
import PokemonDetails, {
  DetailsState,
  PokemonDetailsScreen,
} from "../../components/PokemonDetails"
import { mockFetch } from "../../utils"
import { pokemonMock } from "../../mocks"
import PokemonInfoCard from "../../components/PokemonInfoCard"

const feature = loadFeature("./src/__tests__/features/PokemonDetails.feature")

const nextTick = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

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
  } as unknown as PokemonDetailsScreen

  beforeEach(() => {
    jest.resetModules()
  })

  test("Render Pokemon Details", ({ given, then, when }) => {
    given("It renders without crashing", () => {
      let wrapper: ShallowWrapper<{}, DetailsState>
      window.fetch = mockFetch(pokemonMock)
      wrapper = shallow(<PokemonDetails {...props} />)

      expect(wrapper.exists()).toBe(true)
    })

    then("It will render a loading screen", () => {
      let wrapper: ShallowWrapper<{}, DetailsState>
      window.fetch = mockFetch(pokemonMock)
      wrapper = shallow(<PokemonDetails {...props} />)
      const loading = wrapper.find(Text)
      const text = loading.text()

      expect(text).toBe("Loading...")
    })

    then("after fetching it will render that new pokemon", async () => {
      window.fetch = mockFetch(pokemonMock)

      const wrapper = shallow(<PokemonDetails {...props} />)
      await nextTick()
      wrapper.update()
      const pokemonInfoCard = wrapper.find(PokemonInfoCard)
      expect(pokemonInfoCard.exists()).toBe(true)
    })
  })
})
