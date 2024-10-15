import * as React from 'react'

function IconAccessPoint(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M12 12v.01M14.828 9.172a4 4 0 010 5.656M17.657 6.343a8 8 0 010 11.314M9.168 14.828a4 4 0 010-5.656M6.337 17.657a8 8 0 010-11.314" />
    </svg>
  )
}

export default IconAccessPoint
