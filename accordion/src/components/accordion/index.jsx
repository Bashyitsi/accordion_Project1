import data from "./data"
import { useState } from "react";
import "./style.css"

export default function Accordion() {
    const [selected, setSelected] = useState(null);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
    const [multiple, setMultiple] = useState([]
    )
    function handleSingleSelection(getCurrentID) {
        setSelected(getCurrentID === selected ? null : getCurrentID);
    }
    function handleMultipleSelection(getCurrentID) {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentID)
        console.log(findIndexOfCurrentId);
        if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentID)
        else cpyMultiple.splice(findIndexOfCurrentId, 1)

        setMultiple(cpyMultiple)
    }


    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>
                Enable multi selection
            </button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className=" item">
                            <div onClick={
                                enableMultipleSelection
                                    ? () => handleMultipleSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)}
                                className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                selected === dataItem.id ||
                                    multiple.indexOf(dataItem.id) !== -1 ?
                                    (<div className="content">{dataItem.answer}</div>
                                    ) : null
                            }
                        </div>
                    ))
                ) : (
                    <div>no data found </div>
                )}
            </div>

        </div>
    )
}