import './service.css';
import ServiceContainer from './ServiceContainer';

export default function Service() {
    return (
        <div className='service'>
            <div className='serv-container'>
                <div className='serv-row main-row'>
                <div className="serv-col">
                        <div className="serv-con-wrapper">
                        <ServiceContainer />
                        </div>
                    </div>
                    <div className='main-col'>
                        <div className='serv-text-wrapper'>
                            <div className='serv-line'>Gold Member Access</div>
                            <h1 className='serv-heading'>Get exclusively discounted rates on higher education</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
