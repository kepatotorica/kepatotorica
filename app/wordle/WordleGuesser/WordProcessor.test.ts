/* eslint-disable prettier/prettier */
import { Color, Position } from "./Position";
import { trimWords } from "./WordProcessor";

test("Properly Filters on Green Letters", () => {
    let input = [
        "HELLO",
        "EHLLO",
        "HIGHT",
        "ABACK",
        "ABASE",
        "ABATE",
        "ABBEY",
        "ABBOT",
        "ABHOR",
    ];
    let expected = ["HELLO", "HIGHT"];
    let positionInfo = new Position("H", Color.Green, 0);
    let trimmedWords = trimWords(positionInfo, input);

    expect(trimmedWords).toEqual(expected);
});

test("Properly Filters on Grey Letters", () => {
    let input = [
        "HELLO",
        "EHLLO",
        "HIGHT",
        "ABACK",
        "ABASE",
        "ABATE",
        "ABBEY",
        "ABBOT",
        "ABHOR",
    ];
    let expected = ["ABACK", "ABASE", "ABATE", "ABBEY", "ABBOT"];
    let positionInfo = new Position("H", Color.Grey, 0);
    let trimmedWords = trimWords(positionInfo, input);

    expect(trimmedWords).toEqual(expected);
});

test("Properly Filters on Yellow Letters", () => {
    let input = [
        "HELLO",
        "EHLLO",
        "HIGHT",
        "ABACK",
        "ABASE",
        "ABATE",
        "ABBEY",
        "ABBOT",
        "ABHOR",
    ];
    let expected = ["EHLLO", "ABHOR"];
    let positionInfo = new Position("H", Color.Yellow, 0);
    let trimmedWords = trimWords(positionInfo, input);

    expect(trimmedWords).toEqual(expected);
});

test("Changing the existing words doesn't result the expected", () => {
    let input = [
        "HELLO",
        "EHLLO",
        "HIGHT",
        "ABACK",
        "ABASE",
        "ABATE",
        "ABBEY",
        "ABBOT",
        "ABHOR",
    ];
    let expected = ["EHLLO", "ABHOR"];
    let positionInfo = new Position("H", Color.Yellow, 0);
    let trimmedWords = trimWords(positionInfo, input);

    expect(trimmedWords).toEqual(expected);
});

test("Testing for Inter", () => {
    let input = ["INTER", "INFER", "INTEF", "INGXE"];
    let expected = ["INTER", "INGXE"];
    let positionInfo = new Position("I", Color.Green, 0);
    let trimmedWords = trimWords(positionInfo, input);

    positionInfo = new Position("N", Color.Green, 1);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("E", Color.Yellow, 2);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("F", Color.Grey, 3);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("Z", Color.Grey, 4);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    expect(trimmedWords).toEqual(expected);
});

test("Can Handle double letters", () => {
    let input = ["SHEEP"];
    let expected = ["SHEEP"];
    let positionInfo = new Position("E", Color.Yellow, 0);
    let trimmedWords = trimWords(positionInfo, input);

    positionInfo = new Position("E", Color.Green, 2);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    expect(trimmedWords).toEqual(expected);
});

test("Green is not being respected", () => {
    let input = [
        "APNEA",
        "BICEP",
        "BLEEP",
        "CAPER",
        "CHEAP",
        "CREEP",
        "DEPOT",
        "DEPTH",
        "DOPEY",
        "EMPTY",
        "EPOCH",
        "EPOXY",
        "EQUIP",
        "EXPEL",
        "HYPER",
        "IMPEL",
        "LAPEL",
        "LEPER",
        "OPERA",
        "PALER",
        "PANEL",
        "PAPER",
        "PARER",
        "PAYER",
        "PEACH",
        "PEARL",
        "PECAN",
        "PEDAL",
        "PENAL",
        "PENNY",
        "PERCH",
        "PERIL",
        "PERKY",
        "PESKY",
        "PESTO",
        "PETAL",
        "PETTY",
        "PIETY",
        "PINEY",
        "PIPER",
        "PIXEL",
        "PLEAD",
        "PLEAT",
        "PLIED",
        "PLIER",
        "POESY",
        "POKER",
        "POSER",
        "POWER",
        "PREEN",
        "PRESS",
        "PRIED",
        "PURER",
        "RECAP",
        "REPAY",
        "REPEL",
        "REPLY",
        "RIPEN",
        "RIPER",
        "SEPIA",
        "SETUP",
        "SHEEP",
        "SLEEP",
        "SPEAK",
        "SPEAR",
        "SPECK",
        "SPEED",
        "SPELL",
        "SPELT",
        "SPEND",
        "SPENT",
        "SPERM",
        "SPIED",
        "SPIEL",
        "STEEP",
        "SUPER",
        "SWEEP",
        "TAPER",
        "TEPID",
        "UPPER",
        "UPSET",
        "VIPER",
        "WHELP",
    ];
    let expected = ["SHEEP"];
    let positionInfo = new Position("S", Color.Green, 0);
    let trimmedWords = trimWords(positionInfo, input);

    positionInfo = new Position("H", Color.Green, 1);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("E", Color.Green, 2);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("P", Color.Yellow, 3);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    positionInfo = new Position("E", Color.Yellow, 4);
    trimmedWords = trimWords(positionInfo, trimmedWords);
    expect(trimmedWords).toEqual(expected);
});


// /* eslint-disable prettier/prettier */
// import test from "node:test";
// import assert from 'node:assert';

// import { Color, Position } from "./Position";
// import { trimWords } from "./WordProcessor";


// test("Properly Filters on Green Letters", () => {
//     let input = [
//         "HELLO",
//         "EHLLO",
//         "HIGHT",
//         "ABACK",
//         "ABASE",
//         "ABATE",
//         "ABBEY",
//         "ABBOT",
//         "ABHOR",
//     ];
//     let expected = ["HELLO", "HIGHT"];
//     let positionInfo = new Position("H", Color.Green, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     assert.deepEqual(trimmedWords, expected);
// });

// test("Properly Filters on Grey Letters", () => {
//     let input = [
//         "HELLO",
//         "EHLLO",
//         "HIGHT",
//         "ABACK",
//         "ABASE",
//         "ABATE",
//         "ABBEY",
//         "ABBOT",
//         "ABHOR",
//     ];
//     let expected = ["ABACK", "ABASE", "ABATE", "ABBEY", "ABBOT"];
//     let positionInfo = new Position("H", Color.Grey, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     assert.deepEqual(trimmedWords, expected);
// });

// test("Properly Filters on Yellow Letters", () => {
//     let input = [
//         "HELLO",
//         "EHLLO",
//         "HIGHT",
//         "ABACK",
//         "ABASE",
//         "ABATE",
//         "ABBEY",
//         "ABBOT",
//         "ABHOR",
//     ];
//     let expected = ["EHLLO", "ABHOR"];
//     let positionInfo = new Position("H", Color.Yellow, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     assert.deepEqual(trimmedWords, expected);
// });

// test("Changing the existing words doesn't result the expected", () => {
//     let input = [
//         "HELLO",
//         "EHLLO",
//         "HIGHT",
//         "ABACK",
//         "ABASE",
//         "ABATE",
//         "ABBEY",
//         "ABBOT",
//         "ABHOR",
//     ];
//     let expected = ["EHLLO", "ABHOR"];
//     let positionInfo = new Position("H", Color.Yellow, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     assert.deepEqual(trimmedWords, expected);
// });

// test("Testing for Inter", () => {
//     let input = ["INTER", "INFER", "INTEF", "INGXE"];
//     let expected = ["INTER", "INGXE"];
//     let positionInfo = new Position("I", Color.Green, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     positionInfo = new Position("N", Color.Green, 1);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("E", Color.Yellow, 2);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("F", Color.Grey, 3);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("Z", Color.Grey, 4);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     assert.deepEqual(trimmedWords, expected);
// });

// test("Can Handle double letters", () => {
//     let input = ["SHEEP"];
//     let expected = ["SHEEP"];
//     let positionInfo = new Position("E", Color.Yellow, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     positionInfo = new Position("E", Color.Green, 2);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     assert.deepEqual(trimmedWords, expected);
// });

// test("Green is not being respected", () => {
//     let input = [
//         "APNEA",
//         "BICEP",
//         "BLEEP",
//         "CAPER",
//         "CHEAP",
//         "CREEP",
//         "DEPOT",
//         "DEPTH",
//         "DOPEY",
//         "EMPTY",
//         "EPOCH",
//         "EPOXY",
//         "EQUIP",
//         "EXPEL",
//         "HYPER",
//         "IMPEL",
//         "LAPEL",
//         "LEPER",
//         "OPERA",
//         "PALER",
//         "PANEL",
//         "PAPER",
//         "PARER",
//         "PAYER",
//         "PEACH",
//         "PEARL",
//         "PECAN",
//         "PEDAL",
//         "PENAL",
//         "PENNY",
//         "PERCH",
//         "PERIL",
//         "PERKY",
//         "PESKY",
//         "PESTO",
//         "PETAL",
//         "PETTY",
//         "PIETY",
//         "PINEY",
//         "PIPER",
//         "PIXEL",
//         "PLEAD",
//         "PLEAT",
//         "PLIED",
//         "PLIER",
//         "POESY",
//         "POKER",
//         "POSER",
//         "POWER",
//         "PREEN",
//         "PRESS",
//         "PRIED",
//         "PURER",
//         "RECAP",
//         "REPAY",
//         "REPEL",
//         "REPLY",
//         "RIPEN",
//         "RIPER",
//         "SEPIA",
//         "SETUP",
//         "SHEEP",
//         "SLEEP",
//         "SPEAK",
//         "SPEAR",
//         "SPECK",
//         "SPEED",
//         "SPELL",
//         "SPELT",
//         "SPEND",
//         "SPENT",
//         "SPERM",
//         "SPIED",
//         "SPIEL",
//         "STEEP",
//         "SUPER",
//         "SWEEP",
//         "TAPER",
//         "TEPID",
//         "UPPER",
//         "UPSET",
//         "VIPER",
//         "WHELP",
//     ];
//     let expected = ["SHEEP"];
//     let positionInfo = new Position("S", Color.Green, 0);
//     let trimmedWords = trimWords(positionInfo, input);

//     positionInfo = new Position("H", Color.Green, 1);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("E", Color.Green, 2);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("P", Color.Yellow, 3);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     positionInfo = new Position("E", Color.Yellow, 4);
//     trimmedWords = trimWords(positionInfo, trimmedWords);
//     assert.deepEqual(trimmedWords, expected);
// });
