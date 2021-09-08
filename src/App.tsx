import './App.css';
import {SceneBox} from "./components/SceneBox";
import {ModalScaleInput} from "./components/ModalScaleInput";
import {useState} from "react";

function App() {
    const [localScale, setLocalScale] = useState({
        x: 0.001,
        y: 0.001,
        z: 0.001
    })

    const onChangeScale = (metric: any) => {
        setLocalScale(metric)
    }

    return (
        <div className='app-container'>
            <div className='scene-container'>
                <SceneBox/>
            </div>
            <div className='tools-container'>
                <ModalScaleInput/>
            </div>
        </div>
    );
}

export default App;
