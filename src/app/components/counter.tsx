"use client"

import { decrement, increment, selectCount } from "../redux/slices/counter-slice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

export default function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}