import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { all } from 'axios'

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')


  return <Wrapper>
    <div className='content'>
      {/* 表单的默认action是一旦提交表单就刷新，我们不想这样做 */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* search input */}
        <div className='form-control'>
          <input
            type='text'
            name='text'
            placeholder='search'
            clearFilters='search-input'
            className='search-input'
            value={text}
            onChange={updateFilters}
          />
        </div>
        {/* end search input */}
        {/* categories */}
        <div className='form-control'>
          <h5>category</h5>
          <div>
            {categories.map((c, index) => {
              return (
                <button key={index}
                  onClick={updateFilters}
                  type='button'
                  name='category'
                  className={`${category === c.toLowerCase() ? 'active' : null}`}
                >{c}</button>
              )
            })}
          </div>
        </div>
        {/* end of categories */}
        {/* companies */}
        <div className='form-control'>
          <h5>company</h5>
          {/* select就是下拉条，注意name一定要和filter里字符匹配 */}
          <select name='company' value={company}
            onChange={updateFilters}
            className='company'>
            {/* c是companies，也就是里面的元素，index是它们的索引 */}
            {companies.map((c, index) => {
              return (<option key={index} value={c}>
                {c}
              </option>)
            })}
          </select>
        </div>
        {/* end of companies */}
        {/* colors */}
        <div className='form-control'>
          <h5>colors</h5>
          <div className='colors'>
            {colors.map((c, index) => {
              if (c === 'all') {
                return (
                  <button key={index}
                    name='color'
                    onClick={updateFilters}
                    data-color='all'
                    className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}>
                    all
                  </button>
                )
              }
              return (
                <button key={index}
                  name='color'
                  //inline css 设置按钮背景颜色为color的值
                  style={{ background: c }}
                  className={`${color === c ? 'color-btn active' : 'color-btn'}`}
                  data-color={c}
                  onClick={updateFilters}>
                  {color === c ? <FaCheck /> : null}
                </button>)
            })}
          </div>
        </div>
        {/* end of colors */}
        {/* price */}
        <div className='form-control'>
          <h5>price</h5>
          {/* 这里formatPrice(price)是之前设置的默认价格最大值 */}
          <p className='price'>{formatPrice(price)}</p>
          <input
            type='range'
            name='price'
            onChange={updateFilters}
            min={min_price}
            max={max_price}
            value={price}
          />
        </div>
        {/* end of price */}
        {/* shipping */}
        <div className='form-control shipping'>
          {/*  HTML 中，label 元素用于表示表单控件（例如输入框、单选框、复选框等）的标签文本。 */}
          {/* for 属性的值是关联表单控件的 id 属性的值。例如，如果用户单击“用户名”标签，光标将移动到用户名输入框中,这提高了表单的可用性，并使其更易于使用。 */}
          <label htmlFor='shipping'>free shipping</label>
          <input type='checkbox' name='shipping' id='shipping'
            onChange={updateFilters} checked={shipping} />
        </div>
        {/* end of shipping */}
      </form>
      <button type='button' className='clear-btn' onClick={clearFilters}>
        clear filters
      </button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
