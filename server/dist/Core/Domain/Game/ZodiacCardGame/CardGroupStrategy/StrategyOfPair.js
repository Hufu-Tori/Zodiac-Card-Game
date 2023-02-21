"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardGroup_1 = __importDefault(require("../CardGroup"));
class StrategyOfPair {
    TakeOutCardGroup(cards) {
        let list = [];
        for (let i = cards.length - 2; i >= 0;) {
            if (cards[i].Compare(cards[i + 1])) {
                list.push(new CardGroup_1.default(cards.splice(i, 2)));
                i -= 2;
            }
            else {
                i--;
            }
        }
        return list;
    }
    Meld(play, cards) {
        let index = cards.findIndex(c => c.Compare(play));
        if (index < 0)
            throw "can't meld";
        let list = cards.splice(index, 1);
        list.push(play);
        return new CardGroup_1.default(list);
    }
    Check(play, cards) {
        let index = cards.findIndex(c => c.Compare(play));
        return index >= 0;
    }
}
exports.default = StrategyOfPair;
