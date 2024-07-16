import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"
import PokemonCard, { PokemonCardProps } from "../../components/PokemonCard"
import { Pressable, Text } from "react-native"
import { State } from "../../components/PokemonList"

const feature = loadFeature("./src/__tests__/features/PokemonCard.feature")

defineFeature(feature, (test) => {
  const props: PokemonCardProps = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {},
    name: "test",
    url: "test",
  } as unknown as PokemonCardProps

  let wrapper: ShallowWrapper<{}, State>
  let instance: PokemonCard

  beforeEach(() => {
    jest.resetModules()
    wrapper = shallow(<PokemonCard {...props} />)
    instance = wrapper.instance() as PokemonCard
  })

  test("Render Pokemon Card", ({ given, then, when }) => {
    given("It renders without crashing", () => {
      expect(wrapper.exists()).toBe(true)
    })

    then("I will see a Text of with the Pokemon name", () => {
      const text = wrapper.find(Text)
      const name = text.text()

      expect(name).toBe(props.name)
    })

    when(
      "I click on the pokemon name I will be redirected to a new page",
      () => {
        const navigateSpy = jest.spyOn(props.navigation, "navigate")

        wrapper.find(Pressable).simulate("press")

        expect(navigateSpy).toHaveBeenCalled()
      },
    )
  })
})