import React from 'react'

export default function EmptyBox({height = "100px" }) {
  return (
      <div style={{ height: height }}>&nbsp;</div>
  )
}
