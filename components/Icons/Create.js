import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#2a2e3b"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.029 10.429h10M10.029 15.429V5.428" />
      </g>
    </svg>
  )
}

export default SvgComponent
