import * as React from 'react'

function Main({ children }: React.PropsWithChildren<{}>): React.ReactElement {
  return (
    <div className="main">
      { children }
    </div>
  )
}

export default Main
