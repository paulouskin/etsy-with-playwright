import { CharacterSetType, RandomString } from "ts-randomstring/lib";

export function generateRandomString():string {
    return new RandomString().generate({length: 34, charSetType : CharacterSetType.Alphanumeric}) + ",.<>>"
}