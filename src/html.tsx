import * as React from "react"
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback ({ error }: { error?: Error }) {
  return (
    <div role="alert">
      <p>Whoops, something went wrong:</p>
      <pre style={{color: 'red'}}>{error?.message}</pre>
    </div>
  )
}

interface HTMLProps {
  htmlAttributes: {}
  headComponents: any[]
  bodyAttributes: {}
  preBodyComponents: any[]
  body: string
  postBodyComponents: any[]
}

export default class HTML extends React.Component<HTMLProps> {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,500&display=swap" rel="stylesheet" />
          {this.props.headComponents}
        </head>
        <body className='bg-cream' {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div
              key={`body`
              }
              id="___gatsby"
              dangerouslySetInnerHTML={{ __html: this.props.body }}
            />
          </ErrorBoundary>
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
