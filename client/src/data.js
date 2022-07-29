import { nanoid } from '@reduxjs/toolkit'

export const song1 = {
    title: "my song",
    userId: 0,
    measures: [
        {
            id: nanoid(),
            beats: 4,
            chords: ['a', 'b', 'c', 'd']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['a', 'b', 'c', 'd']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['a', 'b', 'c', 'd']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['a', 'b', 'c', 'd']
        }
    ]
}