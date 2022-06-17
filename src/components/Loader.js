import React from 'react'
import { useState, useEffect } from 'react'

export default function PreLoader({loading}) {
  const [load, setLoad] = useState(null);
  useEffect(() => setLoad(loading), [loading]);
  return (
    <>
    { load &&
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    }
    </>
  )
}
