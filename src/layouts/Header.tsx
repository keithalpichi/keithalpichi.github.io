import React, { ReactElement, useState } from "react"
import { navigate } from '@reach/router'

function Index(): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 flex bg-burnt lg:bg-transparent items-center justify-between flex-wrap p-4">
      <div className="flex items-center flex-shrink-0 text-navy mr-6">
        <svg className="cursor-pointer fill-current text-navy" onClick={() => navigate('/')} width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6667 0H0L8.33333 16.6667L16.6667 0Z" />
          <path d="M33.3333 0H16.6666L25 16.6667L33.3333 0Z" />
          <path d="M50 0H33.3334L41.6667 16.6667L50 0Z" />
          <path d="M16.6667 16.6667H0L8.33333 33.3333L16.6667 16.6667Z" />
          <path d="M33.3333 16.6667H16.6666L25 33.3333L33.3333 16.6667Z" />
          <path d="M50 16.6667H33.3334L41.6667 33.3333L50 16.6667Z" />
          <path d="M16.6667 33.3333H0L8.33333 50L16.6667 33.3333Z" />
          <path d="M33.3333 33.3333H16.6666L25 50L33.3333 33.3333Z" />
          <path d="M50 33.3333H33.3334L41.6667 50L50 33.3333Z" />
        </svg>
      </div>
      {/* <div className="block lg:hidden">
        <button
          onClick={() => {
            setMenuOpen(isMenuOpen => !isMenuOpen)
          }}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={classNames({ block: isMenuOpen, hidden: !isMenuOpen }, `w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto`)}
      >
        <div className="text-sm lg:flex-grow flex items-center flex-col lg:flex-row lg:justify-end">
          <a
            href="#"
            className="block lg:inline-block lg:mt-0 text-navy hover:text-white mr-4 py-3 lg:py-0"
          >
            Blog
          </a>
          <a
            href="#"
            className="block lg:inline-block lg:mt-0 text-navy hover:text-white mr-4 py-3 lg:py-0"
          >
            About
          </a>
        </div>
      </div> */}
    </nav>
  )
}

export default Index