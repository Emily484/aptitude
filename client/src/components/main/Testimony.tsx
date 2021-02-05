import './testimony.css';
import education from '../../images/education.jpg';

export default function Testimony() {
    return (
        <div className='testimony'>
            <div className='test-container'>
                <div className='main-row test-row'>
                <div className="main-col">
                        <div className="test-img-wrapper">
                        <img src={education} alt='edu' className='test-img' />
                        </div>
                    </div>
                    <div className='main-col'>
                        <div className='test-text-wrapper'>
                            <h1 className='test-heading'>"Aptitude helped me with the guidance I needed to pursue my career goals and land a job that inspires me to start the day."</h1>
                            <div className='test-line'>--Kaitlyn Sears</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
