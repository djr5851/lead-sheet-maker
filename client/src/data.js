import { nanoid } from '@reduxjs/toolkit'

export const song1 = {
    title: "title",
    userId: 0,
    measures: [
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        }
    ]
}