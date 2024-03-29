import React from 'react'

const Pagination = ({ productsPerPage, totalProducts, pageChange }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className='pagination flex-wrap'>
        {
          pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <a className='page-link' href='#!' onClick={(e) => pageChange(e, number)}>
                {number}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Pagination