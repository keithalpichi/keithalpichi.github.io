import React, { ReactElement, useState } from "react"
import { graphql } from 'gatsby'
import { classNames } from '../util'
import Posts from '../components/posts'

interface Props {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
            date: string
            excerpt: string
            tags: string[]
          }
        }
      }>
    }
  }
}

function Index(props: Props): ReactElement {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const {
    data: { allMarkdownRemark: { edges: posts } },
    location
  } = props
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-navy mr-6">
          <svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current text-navy">
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
        <div className="block lg:hidden">
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
              className="block lg:inline-block lg:mt-0 text-navy hover:text-white mr-4"
            >
              Blog
            </a>
            <a
              href="#"
              className="block lg:inline-block lg:mt-0 text-navy hover:text-white mr-4"
            >
              About
            </a>
          </div>
        </div>
      </nav>
      <svg viewBox="0 0 1440 668" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M895.611 453.842C895.615 453.331 895.617 452.82 895.617 452.309C895.617 355.488 817.129 277 720.309 277C623.488 277 545 355.488 545 452.309C545 453.344 545.009 454.376 545.027 455.407C573.178 456.624 612.112 457.092 643.132 453.842C696.797 448.22 757.108 454.353 764.774 456.909C769.345 458.432 791.717 457.049 813.806 455.684C828.769 454.759 843.602 453.842 852.684 453.842H895.611Z" fill="#F7C257"/>
          <path d="M249.5 444.5C183.1 443.3 56.1667 459.333 1 467.5V514C10.8333 512.5 101.2 510.7 124 507.5C146.8 504.3 215.5 501.333 279.5 507.5C360.667 508.5 527.4 509.9 545 507.5C567 504.5 787 514 839.5 514C892 514 1004 502 1028 502C1052 502 1244.04 497 1266.5 497H1370.5C1382.1 497 1419.83 490 1440 490C1451.33 474.833 1467.2 444.5 1440 444.5C1406 444.5 1154.5 467.5 1118 467.5C1081.5 467.5 955 463 903.5 463C852 463 844 471 787 472C730 473 733.5 467.5 716.5 467.5H617.5C590 467.5 504.5 461.5 444.5 458C384.5 454.5 332.5 446 249.5 444.5Z" fill="#88C4C8"/>
          <path d="M240 664C173.6 665.2 56.6667 672.167 1.5 664L-4 620C5.83333 621.5 96.2 611.3 119 614.5C141.8 617.7 210.5 620.667 274.5 614.5C355.667 613.5 522.4 612.1 540 614.5C562 617.5 782 608 834.5 608C887 608 999 620 1023 620C1047 620 1239.04 625 1261.5 625H1365.5C1377.1 625 1426.83 614.5 1447 614.5C1458.33 629.667 1462.2 664 1435 664C1401 664 1148 659 1111.5 659H898.5C847 659 835.5 655.5 778.5 654.5C721.5 653.5 728.5 654.5 711.5 654.5C694.5 654.5 625.5 659 598 659C570.5 659 499.5 660.5 439.5 664C379.5 667.5 323 662.5 240 664Z" fill="#88C4C8"/>
          <path d="M1205.52 601.5C1271.92 602.7 1398.85 586.667 1454.02 578.5V532C1444.19 533.5 1353.82 535.3 1331.02 538.5C1308.22 541.7 1239.52 544.667 1175.52 538.5C1094.35 537.5 927.62 536.1 910.02 538.5C888.02 541.5 668.02 532 615.52 532C563.02 532 451.02 544 427.02 544C403.02 544 210.975 549 188.52 549H84.5195C72.9196 549 20.1666 554 0 554C-11.3334 569.167 -12.1804 601.5 15.0195 601.5C49.0195 601.5 300.52 578.5 337.02 578.5C373.52 578.5 500.02 583 551.52 583C603.02 583 611.02 575 668.02 574C725.02 573 721.52 578.5 738.52 578.5H837.52C865.02 578.5 950.52 584.5 1010.52 588C1070.52 591.5 1122.52 600 1205.52 601.5Z" fill="#88C4C8"/>
        </g>
      </svg>
      <Posts posts={posts} location={location} />
    </>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            tags
          }
        }
      }
    }
  }
`
