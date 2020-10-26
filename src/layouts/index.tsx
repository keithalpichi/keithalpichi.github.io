import * as React from "react"
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

const Index: React.SFC = ({ children }) => (
  <>
    <Header />
    <Main>
      { children }
    </Main>
    <Footer />
  </>
)

export default Index