import { useEffect, useRef } from 'react';

export default function Measure(props) {
    //create chord inputs
    const chordInputs = [];
    const ref = useRef(null);
    useEffect(() => {
        // the value of the chord input is displayed in its own div and the input text is hidden
        // so that we can apply styles without the limitations of the input element.
        // the p element in the div is scaled so it's forced to fit in the div if it's too big
        for (let i = 0; i < props.time; i++) {
            const chordDisplay = ref.current.children[i].firstChild;
            const chordText = chordDisplay.firstChild;

            if (props.time === 3) chordDisplay.style.transform = `scaleX(${Math.min(86/chordText.offsetWidth, 1)})`
            else if (props.time === 4) chordDisplay.style.transform = `scaleX(${Math.min(68/chordText.offsetWidth, 1)})`
        }
    })

    for(let i = 0; i < props.time; i++) {
        chordInputs.push(
            <div key={`${props.id}${i}`}>
                <div className='chord--display' data-time={props.time}>
                    <p>{ props.chords[i] }</p>
                </div>
                <input 
                type="text"
                className="chord--input"
                value={props.chords[i]}
                onChange={event => {props.updateChords(props.id, event.target.value, i)}}
                disabled={props.disabled}
                spellCheck='false'
                onClick={(event) => event.target.select()}
                data-time={props.time}
                />
            </div>)
    }
    return (
        <div className="measure" ref={ ref } data-index={ props.index }>
            {chordInputs}
            <div className='measure--selected' data-visible={ false }></div>
        </div>
    )
}