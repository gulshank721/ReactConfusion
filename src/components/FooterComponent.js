import React from 'react';
import { Outlet,Link } from 'react-router-dom';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/aboutus'>About Us</Link></li>
                        <li><Link to='/menu'>Menu</Link></li>
                        <li><Link to='/contactus'>Contact Us</Link></li>
                    </ul>
                </div>
                {/* <Outlet /> */}
                
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <h4>Our social Media Handles</h4>
                        <a className="btn btn-social-icon btn-facebook m-2" href="https://www.facebook.com/profile.php?id=100088417677071"><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-instagram" href="https://www.instagram.com/ristorante_con_fusion/"><i className="fa fa-instagram"></i></a>
                       
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2018 Ristorante Con Fusion</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;