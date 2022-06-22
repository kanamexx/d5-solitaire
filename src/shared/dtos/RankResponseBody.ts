import Rank from "shared/entities/Rank"
import { RankType } from "shared/types"

export default class RankResponseBody {
    private readonly value: RankType

    private constructor (
        value: RankType
    ){
        this.value = value
    }

    public static of = (entity: Rank): RankResponseBody => {
        return new RankResponseBody(entity.value)
    }

}