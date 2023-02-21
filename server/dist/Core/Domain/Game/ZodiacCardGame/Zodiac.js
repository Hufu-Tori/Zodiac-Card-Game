"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zodiac = void 0;
var Zodiac;
(function (Zodiac) {
    Zodiac[Zodiac["Rat"] = 1] = "Rat";
    Zodiac[Zodiac["Ox"] = 2] = "Ox";
    Zodiac[Zodiac["Tiger"] = 3] = "Tiger";
    Zodiac[Zodiac["Rabbit"] = 4] = "Rabbit";
    Zodiac[Zodiac["Dragon"] = 5] = "Dragon";
    Zodiac[Zodiac["Snake"] = 6] = "Snake";
    Zodiac[Zodiac["Horse"] = 7] = "Horse";
    Zodiac[Zodiac["Ram"] = 8] = "Ram";
    Zodiac[Zodiac["Monkey"] = 9] = "Monkey";
    Zodiac[Zodiac["Cock"] = 10] = "Cock";
    Zodiac[Zodiac["Dog"] = 11] = "Dog";
    Zodiac[Zodiac["Pig"] = 12] = "Pig";
})(Zodiac = exports.Zodiac || (exports.Zodiac = {}));
// export class Zodiac {
//     private static zodiacMap: Map<ZodiacType, Zodiac>;
//     private type: ZodiacType;
//     constructor(type: ZodiacType) {
//         this.type = type;
//     }
//     public get Type(): ZodiacType { return this.type; }
//     public Compare(zodiac: Zodiac): boolean {
//         return zodiac.type == this.type;
//     }
//     static GetZodiac(type: ZodiacType) {
//         if (!this.zodiacMap) this.zodiacMap = new Map();
//         if (!this.zodiacMap.get(type)) this.zodiacMap.set(type, new Zodiac(type));
//         return this.zodiacMap.get(type) as Zodiac;
//     }
// }
exports.default = Zodiac;
