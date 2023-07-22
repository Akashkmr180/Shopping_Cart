import { useState } from "react";
import { faqs } from "./faqs";

export default function FaqsAccordion() {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  function openAccordion(index) {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }

  return (
    <div className="my-3 p-5">
      <h1 className="color--pink">Faqs</h1>
      {faqs.map((faq, index) => (
        <Faq
          faq={faq}
          key={faq.question}
          isOpen={openFaqIndex === index}
          handleAccordion={() => openAccordion(index)}
        />
      ))}
    </div>
  );
}

function Faq({ faq, isOpen, handleAccordion }) {
  return (
    <div>
      <div className="accordion">
        <div className="accordion-item m-3">
          <button
            className={`accordion-button bg--gradient ${
              isOpen ? "active" : "collapsed"
            }`}
            onClick={handleAccordion}
          >
            {faq.question}
          </button>
          {isOpen && (
            <div className="accordion-body">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
