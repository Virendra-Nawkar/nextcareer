import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Button>Hello bro</Button>
    <Separator></Separator>
    <p>hello how are you</p>

    </>
  )
}

export default App
