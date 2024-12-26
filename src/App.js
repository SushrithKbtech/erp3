import React, { useEffect } from 'react';
import './upstyle.css';
import './upscript.js';

const App = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = './upscript.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <header className="header">
                <nav className="nav">
                    <img src="/static/images/logo.png" alt="RV University Logo" className="nav__logo" style={{ height: '5rem' }} />
                    <ul className="nav__links">
                        <li className="nav__item"><a className="nav__link" href="#section--1">Features</a></li>
                        <li className="nav__item"><a className="nav__link" href="#section--2">Methods</a></li>
                        <li className="nav__item"><a className="nav__link" href="#section--3">Teachers</a></li>
                        <li className="nav__item"><a className="nav__link" href="/upload"><i className="bi bi-cloud-upload"></i> Upload Portfolio</a></li>
                        <li className="nav__item"><a className="nav__link" href="/view_files">View uploads</a></li>
                        <li className="nav__item"><a className="nav__link" href="/chatbot">AI Assistant</a></li>
                        <li className="nav__item"><a className="nav__link nav__link--profile" href="/"><i className="bi bi-person-circle"></i> Logout</a></li>
                    </ul>
                </nav>

                <div className="header__title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', position: 'relative' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h1>Where <span className="highlight" style={{ color: '#f5ba13' }}>knowledge</span> meets<br /><span className="highlight" style={{ color: '#f5ba13' }}>opportunity</span></h1>
                        <h4>A transformative data collection tool for a smoother experience.</h4>
                        <button className="btn--text btn--scroll-to" style={{ marginTop: '1rem', background: '#f5ba13', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Learn more ↓</button>
                    </div>
                    <div>
                        <img src="https://rvu.edu.in/images/1c9bfffe1d3c301e920a2e640f9eebe9.jpg" 
                             alt="Where Knowledge Meets Opportunity" 
                             style={{ width: '500px', height: 'auto', objectFit: 'cover', marginLeft: '50px', borderRadius: '10px' }} />
                    </div>
                </div>
            </header>

            <section className="section" id="section--1">
                <div className="section__title">
                    <h2 className="section__description">Features</h2>
                    <h3 className="section__header">Everything you have done in one place</h3>
                </div>

                <div className="features">
                    <img src="/static/images/digital-lazy.jpg" data-src="/static/images/digital.jpg" alt="Computer" className="features__img lazy-img" />
                    <div className="features__feature">
                        <div className="features__icon">
                            <svg><use xlinkHref="/static/images/icons.svg#icon-monitor"></use></svg>
                        </div>
                        <h5 className="features__header">100% digital portfolio</h5>
                        <p>A digital portfolio showcases your achievements, skills, and experiences in a modern, interactive format.</p>
                    </div>

                    <div className="features__feature">
                        <div className="features__icon">
                            <svg><use xlinkHref="/static/images/icons.svg#icon-trending-up"></use></svg>
                        </div>
                        <h5 className="features__header">Show your work</h5>
                        <p>Display your projects, achievements, and growth in an engaging way, creating a compelling narrative of your journey.</p>
                    </div>

                    <img src="https://media.licdn.com/dms/image/D4D12AQEpMIZ1AwexTg/article-cover_image-shrink_720_1280/0/1680395555740?e=2147483647&v=beta&t=pdqmQ6OeeB97TBz-6PMNCuvuD8-Rdk6yMMLGrVb5pps" data-src="https://media.licdn.com/dms/image/D4D12AQEpMIZ1AwexTg/article-cover_image-shrink_720_1280/0/1680395555740?e=2147483647&v=beta&t=pdqmQ6OeeB97TBz-6PMNCuvuD8-Rdk6yMMLGrVb5pps" alt="Teacher Validation" className="features__img lazy-img" />

                    <img src="/static/images/Untitled design (7).png" data-src="/static/images/Untitled design (7).png" alt="Portfolio Growth" className="features__img lazy-img" />

                    <div className="features__feature">
                        <div className="features__icon">
                            <svg><use xlinkHref="/static/images/icons.svg#icon-credit-card"></use></svg>
                        </div>
                        <h5 className="features__header">Teacher Validation</h5>
                        <p>Get your work validated by experienced teachers and mentors, adding credibility to your achievements.</p>
                    </div>
                </div>
            </section>

            {/* Additional sections and footer */}
        </div>
    );
};

export default App;
