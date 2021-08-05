import React from 'react';
import '../styles/Footer.css';
import github from '../media/GitHub-Mark.png';
import linkedIn from '../media/LI-Logo.png'

function Footer() {
    return (
        <div className='footer'>
            <div className='github-link'>
                <a target='_blank'  rel="noopener noreferrer" href='https://github.com/southwestmogrown/saltandpreppr'><img alt='github-mark' src={github}></img></a>
            </div>
            <div className='credits-container'>
                <h1>Developed By: </h1>
                <h1 className='developer'>Shane M. Wilkey</h1>
            </div>
            <div className='linkedin-container'>
                <div className='linkedin-link'>
                    <a target='_blank'  rel="noopener noreferrer" href='https://www.linkedin.com/in/shane-wilkey-b5822b210/'><img alt='linked-in-logo' src={linkedIn}></img></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
