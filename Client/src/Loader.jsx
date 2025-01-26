import React from 'react'

const Loader = () => {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      margin: "10px 0 0 0",
    }}
  >
    <div className="spinloader"></div>
  </div>
  )
}

export default Loader