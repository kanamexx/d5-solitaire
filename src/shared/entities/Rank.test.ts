import Rank from './Rank'

describe('instantiate', () => {
    test('successful call returns a instance', () => {
        testSuccessfulInstantiation(1, {rank: Rank.ONE, value: 1, str: 'A'})
        testSuccessfulInstantiation(2, {rank: Rank.TWO, value: 2, str: '2'})
        testSuccessfulInstantiation(3, {rank: Rank.THREE, value: 3, str: '3'})
        testSuccessfulInstantiation(4, {rank: Rank.FOUR, value: 4, str: '4'})
        testSuccessfulInstantiation(5, {rank: Rank.FIVE, value: 5, str: '5'})
        testSuccessfulInstantiation(6, {rank: Rank.SIX, value: 6, str: '6'})
        testSuccessfulInstantiation(7, {rank: Rank.SEVEN, value: 7, str: '7'})
        testSuccessfulInstantiation(8, {rank: Rank.EIGHT, value: 8, str: '8'})
        testSuccessfulInstantiation(9, {rank: Rank.NINE, value: 9, str: '9'})
        testSuccessfulInstantiation(10, {rank: Rank.TEN, value: 10, str: '10'})
        testSuccessfulInstantiation(11, {rank: Rank.ELEVEN, value: 11, str: 'J'})
        testSuccessfulInstantiation(12, {rank: Rank.TWELVE, value: 12, str: 'Q'})
        testSuccessfulInstantiation(13, {rank: Rank.THIRTEEN, value: 13, str: 'K'})
    })
    test('failed call throws Error', () => {
        testFailedInstantiation('invalid')
        testFailedInstantiation(0)
    })
})

describe('comparison', () => {
    test('me is less, then returns true', () => {
        expect(Rank.SIX.isLessThan(Rank.THIRTEEN)).toBeTruthy()
    })
    test('me is more, then returns false', () => {
        expect(Rank.SIX.isLessThan(Rank.ONE)).toBeFalsy()
    })
    test('if the same, then returns false', () => {
        expect(Rank.SIX.isLessThan(Rank.SIX)).toBeFalsy()
    })
})

const testSuccessfulInstantiation = (value: any, expectation: {rank: Rank, value: number, str: string}) => {
    const rank: Rank = Rank.of(value)
    expect(rank).toEqual(expectation.rank)
    expect(rank.value).toEqual(expectation.value)
    expect(rank.toString()).toEqual(expectation.str)
}
const testFailedInstantiation = (value: any) => {
    expect(() => Rank.of(value)).toThrow(new Error(`invalid Rank: ${value}`))
}
