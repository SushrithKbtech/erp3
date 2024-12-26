import React, { useState, useEffect, useRef } from 'react';

const useLazyLoading = () => {
  useEffect(() => {
    const imgTargets = document.querySelectorAll('img[data-src]');

    const loadImg = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      // Replace src with data-src
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img');
      });

      observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '200px',
    });

    imgTargets.forEach((img) => imgObserver.observe(img));
  }, []);
};

const useStickyNavigation = (headerRef, navRef) => {
  useEffect(() => {
    const stickyNav = (entries) => {
      const [entry] = entries;

      if (!entry.isIntersecting) {
        navRef.current.classList.add('sticky');
      } else {
        navRef.current.classList.remove('sticky');
      }
    };

    const observer = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navRef.current.getBoundingClientRect().height}px`,
    });

    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [headerRef, navRef]);
};

const useSectionReveal = () => {
  useEffect(() => {
    const allSections = document.querySelectorAll('.section');

    const revealSection = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach((section) => {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
  }, []);
};

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);

  const maxSlide = slidesRef.current.length;

  const goToSlide = (slide) => {
    slidesRef.current.forEach((slideElement, index) => {
      slideElement.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === maxSlide - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? maxSlide - 1 : prevSlide - 1));
  };

  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <div className="slider">
      <button className="slider__btn slider__btn--left" onClick={prevSlide}>&larr;</button>
      <button className="slider__btn slider__btn--right" onClick={nextSlide}>&rarr;</button>
      <div className="dots">
        {Array.from({ length: maxSlide }).map((_, i) => (
          <button
            key={i}
            className={`dots__dot ${currentSlide === i ? 'dots__dot--active' : ''}`}
            onClick={() => setCurrentSlide(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const navRef = useRef(null);
  const headerRef = useRef(null);

  useLazyLoading();
  useStickyNavigation(headerRef, navRef);
  useSectionReveal();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (tabIndex) => setActiveTab(tabIndex);

  return (
    <>
      <header className="header" ref={headerRef}>
        <nav className="nav" ref={navRef}>
          <img src="/static/images/logo.png" alt="RV University Logo" className="nav__logo" />
          <ul className="nav__links">
            <li><a href="#section--1" onClick={(e) => { e.preventDefault(); scrollToSection('#section--1'); }}>Features</a></li>
            <li><a href="#section--2" onClick={(e) => { e.preventDefault(); scrollToSection('#section--2'); }}>Methods</a></li>
            <li><a href="#section--3" onClick={(e) => { e.preventDefault(); scrollToSection('#section--3'); }}>Teachers</a></li>
            <li><button className="btn btn--show-modal" onClick={openModal}>Upload Portfolio</button></li>
          </ul>
        </nav>
        <div className="header__title">
          <h1>Where <span className="highlight">knowledge</span> meets <span className="highlight">opportunity</span></h1>
          <button onClick={() => scrollToSection('#section--1')}>Learn more ↓</button>
        </div>
      </header>

      <main>
        <section id="section--1">
          <h2>Features</h2>
          <p>Explore our features...</p>
        </section>
        <section id="section--2">
          <div className="operations">
            <div className="operations__tab-container">
              <button
                className={`operations__tab ${activeTab === 1 ? 'operations__tab--active' : ''}`}
                onClick={() => handleTabClick(1)}
              >
                Tab 1
              </button>
              <button
                className={`operations__tab ${activeTab === 2 ? 'operations__tab--active' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                Tab 2
              </button>
              <button
                className={`operations__tab ${activeTab === 3 ? 'operations__tab--active' : ''}`}
                onClick={() => handleTabClick(3)}
              >
                Tab 3
              </button>
            </div>
            <div className="operations__content">
              {activeTab === 1 && <p>Content for Tab 1</p>}
              {activeTab === 2 && <p>Content for Tab 2</p>}
              {activeTab === 3 && <p>Content for Tab 3</p>}
            </div>
          </div>
        </section>
        <Slider />
      </main>

      {isModalOpen && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button className="btn--close-modal" onClick={closeModal}>×</button>
            <form>
              <label>First Name</label>
              <input type="text" />
              <label>Last Name</label>
              <input type="text" />
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>Footer Content</p>
      </footer>
    </>
  );
};

export default App;
