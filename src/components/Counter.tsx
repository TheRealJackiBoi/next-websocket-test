'use client'
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
  <div className="text-center">
    <h1 className="text-4xl">{count}</h1>
    <button className="rounded bg-blue-700 p-2" onClick={() => setCount(prev => prev + 1)}>inc</button>
  </div>
  )
}

export default Counter