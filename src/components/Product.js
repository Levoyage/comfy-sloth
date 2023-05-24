import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

//我们已经用context传入image, name, price, id这些信息，现在拿出来用就是了
const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={name} />
        {/* ${id} 是一个占位符，用于表示变量 id 的值。这种语法可以让我们更方便地拼接字符串，尤其是在需要动态生成 URL 的时候。
    在这个例子中，/products/${id} 表示一个商品的详情页面 URL */}
        <Link to={`/products/${id}`} className='link'>
          {/* 鼠标悬停的放大镜图标 */}
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>${price / 100}</p>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`
export default Product;
