export default function Measure(props) {
    //create chord inputs
    const chordInputs = [];
    for(let i = 0; i < props.beats; i++) {
        chordInputs.push(<input type="text" className="chordinput"/>)
    }
    return (
        <div className="measure" data-beats={props.beats}>
            {chordInputs}
        </div>
    )
}