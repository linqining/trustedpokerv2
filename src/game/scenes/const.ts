
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
    CardTypeNames: ["", "高牌", "一对", "两对", "三条", "顺子","同花","葫芦","四条","同花顺","皇家同花顺"]
}

export default CONST;