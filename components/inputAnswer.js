import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil'

import { talkState, answerTextAtom } from "state/talkState"

function InputAnswer(props) {
    let items = []
    let workText = ""
    const setState = useSetRecoilState(talkState);
    const setanswerText = useSetRecoilState(answerTextAtom);
    
    // 初期状態セット
    useEffect(() => {
        console.log("useEffect:InputAnswer Render:")
        return () => {
            console.log("useEffect:InputAnswer Unmount")
        }
    })

    function onformSubmit(e){
        setanswerText(workText)
        setState(props.nextState)
    }

    function onTextAreaChange(e){
        workText = e.target.value
    }

    console.log("Call:InputAnswer")
    
    return (
        <>
            <textarea
                placeholder="Your Message"
                name="message"
                onChange={onTextAreaChange}
                required
            />
            <div>
                <button onClick={onformSubmit}>OK</button>
            </div>
        </>
    )
}

export default InputAnswer;
  