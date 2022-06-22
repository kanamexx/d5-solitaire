import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

export default class CardServer {
    private constructor(){}

    public static serve = (): Card[] => {
        return Suit.list()
            .map(suit => Rank.list()
                .map(rank => Card.of(suit, rank, false)))
            .flat()
    }
}

