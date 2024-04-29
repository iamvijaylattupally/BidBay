import React from 'react'

const ProductCardDelete = (props) => {
    const handleClick = () => {
        props.productClicked(props.pid);
      };
    const deleteCart = () => {
        props.deleteCartClicked(props.pid);
      };
  return (
    <>
        <article class="projects__card">
      <div class="projects__image">
        <img src={props.pimg} alt="image" class="projects__img"/>

        <button onClick={deleteCart} class="projects__button button">
        <i class="ri-delete-bin-6-fill"></i>
        </button>
      </div>

      <div class="projects__content">
        <h3 class="projects__subtitle">Sold By: {props.sellername}</h3>
        <h2 class="projects__title">{props.title}</h2>
        <h3 class="projects__title">current price: {props.currentprice}</h3>

        <p class="projects__description">
            {props.productdescription.split(' ').slice(0, 15).join(' ')}{props.productdescription.split(' ').length > 15 ? ' ...' : ''}
          </p>
      </div>

      <div class="projects__buttons">
        <button onClick={handleClick} class="projects__link btn">
            <i class="ri-dribbble-line"></i> Make a Bid
        </button>
        <h4>{props.status ? "Live" : "Auction Ended"}</h4>
      </div>
    </article>
    </>
  )
}

export default ProductCardDelete;