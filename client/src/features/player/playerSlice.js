import { createSlice } from "@reduxjs/toolkit";

const validChords = {
    'A': ['A1', 'A3', 'C#4', 'E4'],
    'A-': ['A1', 'A3', 'C4', 'E4'],
    'A7': ['A1', 'G3', 'C#4', 'E4'],
    'AΔ7': ['A1', 'G#3', 'C#4', 'E4'],
    'A-7': ['A1', 'G3', 'C4', 'E4'],
    'B♭': ['Bb1', 'Bb3', 'D4', 'F4'],
    'B♭-': ['Bb1', 'Bb3', 'Db4', 'F4'],
    'B♭7': ['Bb1', 'Ab3', 'D4', 'F4'],
    'B♭Δ7': ['Bb1', 'A3', 'D4', 'F4'],
    'B♭-7': ['Bb1', 'Ab3', 'Db4', 'F4'],
    'B': ['B1', 'B3', 'D#4', 'F#4'],
    'B-': ['B1', 'B3', 'D4', 'F#4'],
    'B7': ['B1', 'A3', 'D#4', 'F#4'],
    'BΔ7': ['B1', 'A#3', 'D#4', 'F#4'],
    'B-7': ['B1', 'A3', 'D4', 'F#4'],
    'C': ['C2', 'G3', 'C4', 'E4'],
    'C-': ['C2', 'G3', 'C4', 'Eb4'],
    'C7': ['C2', 'G3', 'Bb3', 'E4'],
    'CΔ7': ['C2', 'G3', 'B3', 'E4'],
    'C-7': ['C2', 'G3', 'Bb3', 'Eb4'],
    'D♭': ['Db2', 'Ab3', 'Db4', 'F4'],
    'D♭-': ['Db2', 'Ab3', 'Db4', 'E4'],
    'D♭7': ['Db2', 'Ab3', 'B3', 'F4'],
    'D♭Δ7': ['Db2', 'Ab3', 'C4', 'F4'],
    'D♭-7': ['Db2', 'Ab3', 'B3', 'E4'],
    'D': ['D2', 'A3', 'D4', 'F#4'],
    'D-': ['D2', 'A3', 'D4', 'F4'],
    'D7': ['D2', 'A3', 'C4', 'F#4'],
    'DΔ7': ['D2', 'A3', 'C#4', 'F#4'],
    'D-7': ['D2', 'A3', 'C4', 'F4'],
    'E♭': ['Eb2', 'G3', 'Bb3', 'Eb4'],
    'E♭-': ['Eb2', 'Gb3', 'Bb3', 'Eb4'],
    'E♭7': ['Eb2', 'G3', 'Bb3', 'Db4'],
    'E♭Δ7': ['Eb2', 'G3', 'Bb3', 'D4'],
    'E♭-7': ['Eb2', 'Gb3', 'Bb3', 'Bb4'],
    'E': ['E2', 'G#3', 'B3', 'E4'],
    'E-': ['E2', 'G3', 'B3', 'E4'],
    'E7': ['E2', 'G#3', 'B3', 'D4'],
    'EΔ7': ['E2', 'G#3', 'B3', 'D#4'],
    'E-7': ['E2', 'G3', 'B3', 'D4'],
    'F': ['F2', 'A3', 'C4', 'F4'],
    'F-': ['F2', 'Ab3', 'C4', 'F4'],
    'F7': ['F2', 'A3', 'C4', 'Eb4'],
    'FΔ7': ['F2', 'A3', 'C4', 'E4'],
    'F-7': ['F2', 'Ab3', 'C4', 'Eb4'],
    'G♭': ['Gb2', 'Bb3', 'Db4', 'Gb4'],
    'G♭-': ['Gb2', 'A3', 'Db4', 'Gb4'],
    'G♭7': ['Gb2', 'Bb3', 'Db4', 'E4'],
    'G♭Δ7': ['Gb2', 'Bb3', 'Db4', 'F4'],
    'G♭-7': ['Gb2', 'A3', 'Db4', 'E4'],
    'G': ['G2', 'G3', 'B3', 'D4'],
    'G-': ['G2', 'G3', 'Bb3', 'D4'],
    'G7': ['G2', 'F3', 'B3', 'D4'],
    'GΔ7': ['G2', 'F#3', 'B3', 'D4'],
    'G-7': ['G2', 'F3', 'Bb3', 'D4'],
    'A♭': ['Ab2', 'Ab3', 'C4', 'Eb4'],
    'A♭-': ['Ab2', 'Ab3', 'B3', 'Eb4'],
    'A♭7': ['Ab2', 'Gb3', 'C4', 'Eb4'],
    'A♭Δ7': ['Ab2', 'G3', 'C4', 'Eb4'],
    'A♭-7': ['Ab2', 'Gb3', 'B3', 'Eb4'],
    '': []
}

//enharmonics
validChords['A♯'] = validChords['B♭'];
validChords['A♯-'] = validChords['B♭-'];
validChords['A♯7'] = validChords['B♭7'];
validChords['A♯Δ7'] = validChords['B♭Δ7'];
validChords['A♯-7'] = validChords['B♭-7'];
validChords['B♯'] = validChords['C'];
validChords['B♯-'] = validChords['C-'];
validChords['B♯7'] = validChords['C7'];
validChords['B♯Δ7'] = validChords['CΔ7'];
validChords['B♯-7'] = validChords['C-7'];
validChords['C♭'] = validChords['B'];
validChords['C♭-'] = validChords['B-'];
validChords['C♭7'] = validChords['B7'];
validChords['C♭Δ7'] = validChords['BΔ7'];
validChords['C♭-7'] = validChords['B-7'];
validChords['C♯'] = validChords['D♭'];
validChords['C♯-'] = validChords['D♭-'];
validChords['C♯7'] = validChords['D♭7'];
validChords['C♯Δ7'] = validChords['D♭Δ7'];
validChords['C♯-7'] = validChords['D♭-7'];
validChords['D♯'] = validChords['E♭'];
validChords['D♯-'] = validChords['E♭-'];
validChords['D♯7'] = validChords['E♭7'];
validChords['D♯Δ7'] = validChords['E♭Δ7'];
validChords['D♯-7'] = validChords['E♭-7'];
validChords['E♯'] = validChords['F'];
validChords['E♯-'] = validChords['F-'];
validChords['E♯7'] = validChords['F7'];
validChords['E♯Δ7'] = validChords['FΔ7'];
validChords['E♯-7'] = validChords['F-7'];
validChords['F♭'] = validChords['E'];
validChords['F♭-'] = validChords['E-'];
validChords['F♭7'] = validChords['E7'];
validChords['F♭Δ7'] = validChords['EΔ7'];
validChords['F♭-7'] = validChords['E-7'];
validChords['F♯'] = validChords['G♭'];
validChords['F♯-'] = validChords['G♭-'];
validChords['F♯7'] = validChords['G♭7'];
validChords['F♯Δ7'] = validChords['G♭Δ7'];
validChords['F♯-7'] = validChords['G♭-7'];
validChords['G♯'] = validChords['A♭'];
validChords['G♯-'] = validChords['A♭-'];
validChords['G♯7'] = validChords['A♭7'];
validChords['G♯Δ7'] = validChords['A♭Δ7'];
validChords['G♯-7'] = validChords['A♭-7'];

const initialState = {
    validChords
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {}
})

export const getValidChords = (state) => state.player.validChords;

export default playerSlice.reducer