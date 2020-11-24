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
        <path d="M3.5 14.5V7.236a2 2 0 011.106-1.789l5-2.5a2 2 0 011.788 0l5 2.5a2 2 0 011.106 1.79V14.5a2 2 0 01-2 2h-10a2 2 0 01-2-2zM7.5 10.5h6M10.5 13.5v-6" />
      </g>
    </svg>
  )
}

export default SvgComponent
