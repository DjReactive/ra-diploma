import React from 'react'

export function AlertMessage({type, message}) {
  return (
    <div className={`alert alert-${type} fixed-error`} role="alert">
      {message}
    </div>
  )
}
