import { RankSymbolType, RankType } from "shared/types"


export default class Rank {
    private readonly _value: RankType

    public static readonly ONE: Rank = new Rank(1)
    public static readonly TWO: Rank = new Rank(2)
    public static readonly THREE: Rank = new Rank(3)
    public static readonly FOUR: Rank = new Rank(4)
    public static readonly FIVE: Rank = new Rank(5)
    public static readonly SIX: Rank = new Rank(6)
    public static readonly SEVEN: Rank = new Rank(7)
    public static readonly EIGHT: Rank = new Rank(8)
    public static readonly NINE: Rank = new Rank(9)
    public static readonly TEN: Rank = new Rank(10)
    public static readonly ELEVEN: Rank = new Rank(11)
    public static readonly TWELVE: Rank = new Rank(12)
    public static readonly THIRTEEN: Rank = new Rank(13)

    private constructor(value: RankType){
        this._value = value
    }

    public static of = (value: RankType): Rank => {
        switch (value){
            case 1: return Rank.ONE
            case 2: return Rank.TWO
            case 3: return Rank.THREE
            case 4: return Rank.FOUR
            case 5: return Rank.FIVE
            case 6: return Rank.SIX
            case 7: return Rank.SEVEN
            case 8: return Rank.EIGHT
            case 9: return Rank.NINE
            case 10: return Rank.TEN
            case 11: return Rank.ELEVEN
            case 12: return Rank.TWELVE
            case 13: return Rank.THIRTEEN
            default: throw new Error(`invalid Rank: ${value}`)
        }
    }

    public static all = (): Rank[] => {
        return [
            this.ONE, this.TWO, this.THREE, this.FOUR,
            this.FIVE, this.SIX, this.SEVEN, this.EIGHT,
            this.NINE, this.TEN, this.ELEVEN, this.TWELVE,
            this.THIRTEEN,
    ]}


    public get value(): RankType{
        return this._value
    }

    public isLessThan = (another: Rank): boolean => {
        return this._value < another._value
    }

    public toString = (): RankSymbolType => {
        switch(this._value){
            case 1: return 'A'
            case 11: return 'J'
            case 12: return 'Q'
            case 13: return 'K'
            default: return this._value.toString() as RankSymbolType
        }
    }
}