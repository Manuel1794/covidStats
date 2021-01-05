import { useEffect, useState } from "react"

const useWidth = () => {

    const [widthScreen, setWidthScreen] = useState(window.innerWidth)

    useEffect(()=> {
        const handleResize= () => setWidthScreen(window.innerWidth)
        window.addEventListener('resize', handleResize)//changes in window.innerWidth

        return () => {
            window.removeEventListener('resize',handleResize)
        }
    },[widthScreen])

    const isMediumDevice = widthScreen >= 769

    return {isMediumDevice}
}

export  default useWidth