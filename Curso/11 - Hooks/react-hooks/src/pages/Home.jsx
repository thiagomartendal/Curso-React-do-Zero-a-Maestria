import { useContext } from "react"
import { SomeContext } from "../components/HookUseContext"

import HooksUseState from "../components/HooksUseState"
import HookUseEffect from "../components/HookUseEffect"
import HookUseReducer from "../components/HookUseReducer"
import HookUseRef from "../components/HookUseRef"
import HookUseCallback from "../components/HookUseCallback"
import HookUseMemo from "../components/HookUseMemo"
import HookUseLayoutEffect from "../components/HookUseLayoutEffect"
import HookUseImperativeHandle from "../components/HookUseImperativeHandle"
import HookCuston from "../components/HookCuston"

const Home = () => {
    const {contextValue} = useContext(SomeContext)

    return (
        <div>
            <HooksUseState />
            <HookUseReducer />
            <HookUseEffect />
            <h2>useContext</h2>
            <p>Valor do contexto: {contextValue}</p>
            <hr />
            <HookUseRef />
            <HookUseCallback />
            <HookUseMemo />
            <HookUseLayoutEffect />
            <HookUseImperativeHandle />
            <HookCuston />
        </div>
    )
}

export default Home