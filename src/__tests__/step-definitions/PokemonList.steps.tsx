import { shallow, ShallowWrapper } from "enzyme"
import { defineFeature, loadFeature } from "jest-cucumber"

import { mockFetch } from "../../utils"
import { pokemonListResponseMock, pokemonListResponseMock2 } from "../../mocks"
import PokemonList, {
  PokemonListProps,
  State,
} from "../../components/PokemonList"
import Search from "../../components/Search"
import { FlatList } from "react-native"

const feature = loadFeature("./src/__tests__/features/PokemonList.feature")

const nextTick = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

defineFeature(feature, (test) => {
  const props: PokemonListProps = {
    navigation: {
      dispatch: jest.fn(),
    },
    route: {},
  } as unknown as PokemonListProps

  let wrapper: ShallowWrapper<{}, State>
  let instance: PokemonList

  beforeEach(() => {
    jest.resetModules()
    window.fetch = mockFetch(pokemonListResponseMock)
    wrapper = shallow(<PokemonList {...props} />)
    instance = wrapper.instance() as PokemonList
  })

  test("Render Pokemon List", ({ given, then, when }) => {
    given("It renders without crashing", () => {
      expect(wrapper.exists()).toBe(true)
    })

    then("I will see an Input Text where I can search Pokemon", () => {
      const searchComponent = wrapper.find(Search)

      expect(searchComponent.exists()).toBe(true)
    })

    then("I will see a list of pokemon", () => {
      const flatlist = wrapper.find("FlatList").props()
      expect(flatlist.data?.length).toEqual(2)
    })

    when(
      "I scrolldown to the bottom of the list I will see more pokemon",
      async () => {
        window.fetch = mockFetch(pokemonListResponseMock2)
        const flatlist1 = wrapper.find(FlatList)
        flatlist1.simulate("endReached")
        await nextTick()
        wrapper.update()
        const flatlist = wrapper.find("FlatList").props()
        expect(flatlist.data?.length).toEqual(4)
      },
    )

    when(
      "I scrolldown to the bottom of the list and there is no next url I will see the same value",
      async () => {
        window.fetch = mockFetch(pokemonListResponseMock2)

        const flatlist1 = wrapper.find(FlatList)
        flatlist1.simulate("endReached")
        await nextTick()
        wrapper.update()
        const flatlist = wrapper.find("FlatList").props()
        expect(flatlist.data?.length).toEqual(4)
      },
    )
  })
})
