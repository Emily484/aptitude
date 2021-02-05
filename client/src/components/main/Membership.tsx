import bronze from '../../images/bronze.jpg'
import silver from '../../images/silver.jpg'
import gold from '../../images/gold.jpg'
import './membership.css';

export default function Membership() {
    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className="col-md-4">
                <div className="card text-center">
                    <div className="overflow">
                        <img src={bronze} alt='bronze' className='card-img-top' />
                    </div>
                    <div className='mem-card-body text-dark'>
                        <h4 className='card-title'>Bronze Tier</h4>
                        <h6>$14.99/mo</h6>
                        <p className='card-text text-secondary'>Access to APPTITUDE testing</p>
                        <a href='#' className='btn btn-outline-info'>Join Bronze Tier</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mem-card text-center">
                    <div className="overflow">
                        <img src={silver} alt='silver' className='card-img-top' />
                    </div>
                    <div className='mem-card-body text-dark'>
                        <h4 className='card-title'>Silver Tier</h4>
                        <h6>$44.99/mo</h6>
                        <p className='card-text text-secondary'>Interview prep courses</p>
                        <p className='card-text text-secondary'>Resume feedback</p>
                        <a href='#' className='btn btn-outline-secondary'>Join Silver Tier</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-center">
                    <div className="overflow">
                     <img src={gold} alt='gold' className='card-img-top' />
                    </div>
                    <div className='mem-card-body text-dark'>
                        <h4 className='card-title'>Gold Tier</h4>
                        <h6>$99.99/mo</h6>
                        <p className='card-text text-secondary'>Exclusive access to our TRMS</p>
                        <a href='#' className='btn btn-outline-warning'>Join Gold Tier</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
