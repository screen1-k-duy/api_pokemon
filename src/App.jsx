import { useState } from 'react'
import Pokemon from './components/pokemon/Pokemon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokemon itemsPerPage={18} />
    </>
  )
}

export default App
