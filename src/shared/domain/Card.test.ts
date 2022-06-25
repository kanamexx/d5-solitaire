import Card from './Card'
import Rank from './Rank'
import Suit from './Suit'

describe('instantiate', () => {
    test('successful call by ValueClass returns instance', () => {
        testSuccessfulInstantiation(
            {suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false},
            {suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false})
        testSuccessfulInstantiation(
            {suit: Suit.CLUB.value, rank: Rank.EIGHT.value, isTail: false},
            {suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false})
    })
    test('successful call by value returns instance', () => {
        Suit.list().map(suit => 
            Rank.list().map(rank => 
                testSuccessfulInstantiation(
                    {suit: suit.value, rank: rank.value, isTail: false},
                    {suit: suit, rank: rank, isTail: false})))
    })
    test('failed call throws error', () => {
        testFailedInstantiation(null, Rank.EIGHT,false)
        testFailedInstantiation(Suit.CLUB, null, false)
    })
})

const testSuccessfulInstantiation = (value: any, expectation: {suit: Suit, rank: Rank, isTail: boolean}) => {
    const entity = Card.of(value.suit, value.rank, value.isTail)
    expect(entity.suit).toEqual(expectation.suit)
    expect(entity.rank).toEqual(expectation.rank)
    expect(entity.getSuitString()).toEqual(expectation.suit.value)
    expect(entity.getRankString()).toEqual(expectation.rank.value)
    expect(entity.isTail).toBeFalsy()
}
const testFailedInstantiation = (suit: any, rank: any, isTail: boolean) => {
    expect(() => Card.of(suit, rank, isTail)).toThrow(new Error(`invalid args: {suit: ${suit}, rank: ${rank}, isTail: ${isTail}`))
}
