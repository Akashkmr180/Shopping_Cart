import { useState } from "react";
import { iceCreamData } from "./iceCreamData";
import FaqsAccordion from "./FaqsAccordion";
import Footer from "./Footer";

export default function App() {
  const [count, setCount] = useState({});

  function countDec(flavor) {
    setCount((prevCount) => ({
      ...prevCount,
      [flavor]: prevCount[flavor] > 0 ? prevCount[flavor] - 1 : 0,
    }));
  }

  function countInc(flavor) {
    setCount((prevCount) => ({
      ...prevCount,
      [flavor]: (prevCount[flavor] || 0) + 1,
    }));
  }

  function addToCart() {
    console.log(count);
    setCount(0);
  }

  return (
    <div className="container-fluid app">
      <Header />
      <Menu
        count={count}
        countDec={countDec}
        countInc={countInc}
        onAddToCart={addToCart}
      />
      <FaqsAccordion />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="d-flex justify-content-between bg--gradient my-3 p-3 header">
      <Logo />
      <Cart />
    </div>
  );
}

function Logo() {
  return (
    <figure className="logo--img">
      <img src="../img/Logo.png" alt="Logo" />
    </figure>
  );
}

function Cart() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleModalOpen() {
    setModalIsOpen(true);
  }

  function handleModalClose() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <div className="d-flex">
        {/* <div className="m-auto px-3">
          <p>X ice cream</p>
          <p>total € X</p>
        </div> */}
        <button
          className="p-3 cart--icon border-0 bg-transparent"
          onClick={handleModalOpen}
        >
          🛒🧺
        </button>
      </div>
      {modalIsOpen && <Modal onModalClose={handleModalClose} />}
    </div>
  );
}

function Modal({ onModalClose }) {
  return (
    <div className="modal--bg">
      <div class="card modal--card">
        <div className="card-header bg--gradient d-flex justify-content-between border-0">
          <h2 class="my-3">Your Ice Cream Order</h2>
          <button
            className="btn-close d-flex align-self-center"
            onClick={onModalClose}
          ></button>
        </div>
        <div class="card-body d-flex">
          <p class="col-4">Flavor</p>
          <p class="col-4">Price</p>
          <p class="col-4">Total</p>
        </div>
        <div class="card-body d-flex">
          <p class="col-4">3x Strawberry</p>
          <p class="col-4">€ 8</p>
          <p class="col-4">€ 24</p>
        </div>
        <div className="card-footer border-0 bg--gradient d-flex justify-content-between">
          <h2>total</h2>
          <p>€ price</p>
        </div>
      </div>
    </div>
  );
}

function Menu({ count, countDec, countInc, onAddToCart }) {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {iceCreamData.map((ice) => (
        <IceCream
          ice={ice}
          key={ice.flavor}
          count={count[ice.flavor] || 0}
          countDec={() => countDec(ice.flavor)}
          countInc={() => countInc(ice.flavor)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function IceCream({ ice, count, countDec, countInc, onAddToCart }) {
  return (
    <div>
      <div className="card ice-cream--card">
        <img className="card-img-top p-2" src={ice.img} alt={ice.flavor} />
        <div className="card-body">
          <h1 className="color--pink">{ice.flavor}</h1>
          <p>{ice.description}</p>
          <div className="d-flex mb-4">
            <button className="btn" onClick={countDec}>
              -
            </button>
            <span className="m-3">{count}</span>
            <button className="btn" onClick={countInc}>
              +
            </button>
            <span className="m-3">
              {ice.unit} / € {ice.price}
            </span>
          </div>
          <button className="btn bg--gradient border-0" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
