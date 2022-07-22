import { nanoid } from 'nanoid';

export const song1 = {
    title: "my song",
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