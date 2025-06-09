
const CONST = {
    // 弃牌
    BetType_Fold:0,
//让牌/看注
    BetType_Check: 1,
//跟注
    BetType_Call : 2,
//加注
    BetType_Raise: 3,
//全压
    BetType_ALL: 4,

    BetTypeNames: ["fold", "check", "call", "raise", "allin"],
    CardTypeNames: ["", "HighCard", "Pair", "TwoPair", "ThreeOfAKind", "Straight","Flush","FullHouse","FourOfAKind","StraightFlush","RoyalFlush"]
}

export default CONST;