import React from 'react'

const ProductCard = (props) => {
  const handleClick = () => {
    props.productClicked(props.pid);
  };
  const addCart = () => {
    props.addCartClicked(props.pid);
  };
  return (
    <>
      <article class="projects__card">
        <div class="projects__image">
          <img src={props.pimg} alt="image" class="projects__img" />

          <button onClick={addCart} class="projects__button button">
            <i class="ri-shopping-cart-2-fill"></i>
          </button>
        </div>

        <div class="projects__content">
          <h3 class="projects__subtitle">Sold By: {props.sellername}</h3>
          <h2 class="projects__title">{props.title}</h2>
          <h3 class="projects__title">current price: {props.currentprice}</h3>
          {props.bidded ? <h3 class="projects__title">Your Highest Bid: {props.userbidprice}</h3> : null}

          <p class="projects__description">
            {props.productdescription.split(' ').slice(0, 15).join(' ')}{props.productdescription.split(' ').length > 15 ? ' ...' : ''}
          </p>

        </div>

        <div class="projects__buttons">
          <button onClick={handleClick} class="projects__link btn">
            <i class="ri-dribbble-line"></i> {props.status ? "Make a Bid" : "View Product"}
          </button>
          <h4>{props.status ? "Live" : "Auction Ended"}</h4>
        </div>
      </article>
    </>
  )
}

export default ProductCard