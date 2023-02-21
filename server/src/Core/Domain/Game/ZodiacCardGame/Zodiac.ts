export enum Zodiac {
    Rat = 1, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Ram, Monkey, Cock, Dog, Pig
}

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

export default Zodiac;