import { nanoid } from 'nanoid';

export default function Measure(props) {
    //create chord inputs
    const chordInputs = [];
    for(let i = 0; i < props.beats; i++) {
        chordInputs.push(<input 
            key={nanoid()}
            type="text"
            className="chordinput"
            value={props.chords[i]}
            onChange={event => {props.updateChords(props.id, event.target.value, i)}}
            />)
    }
    return (
        <div className="measure" data-beats={props.beats}>
            {chordInputs}
        </div>
    )
}