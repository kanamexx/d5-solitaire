import Suit from "./Suit";

describe('instantiate', () => {
    test('successful call returns a instance', ()=>{
        testSuccessfulInstantiation('♠', Suit.SPADE)
        testSuccessfulInstantiation('♣', Suit.CLUB)
        testSuccessfulInstantiation('♡', Suit.HEART)
        testSuccessfulInstantiation('♢', Suit.DIAMOND)
    })
    test('failed call throws Error', () => {
        testFailedInstantiation('invalid','invalid Suit: invalid')
    })
})

describe('list', () => {
    test('successful call returns all Suit', () => {
        expect(Suit.list()).toEqual(
            [Suit.SPADE, Suit.CLUB, Suit.HEART]
        )
    })
})

const testSuccessfulInstantiation = (symbol: any, expectation: Suit) => {
    const suit: Suit = Suit.of(symbol)
    expect(suit).toEqual(expectation)
    expect(suit.symbol).toBe(expectation.symbol)
    expect(suit.color).toBe(expectation.color)
}
const testFailedInstantiation = (symbol: any, message: string) => {
    expect(() => Suit.of(symbol)).toThrow(new Error(message))
}

export { };
