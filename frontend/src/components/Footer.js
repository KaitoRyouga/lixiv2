import React from 'react'
import '../assets/css/footer.css'

const Footer = () => {
    return (
<div className="container-footer w-container">
        <div className="w-row">
          <div className="footer-column w-clearfix w-col w-col-4"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/596d33f36607b12cfdaf8ad2_LogoWhite.png" alt="" width={40} className="failory-logo-image" />
            <h3 className="footer-failory-name">GunnerKMA</h3>
            <p className="footer-description-failory">devf xin chào các bạn<br /></p>
          </div>
          <div className="footer-column w-col w-col-8">
            <div className="w-row">
              <div className="w-col w-col-8">
                <div className="w-row">
                  <div className="w-col w-col-7 w-col-small-6 w-col-tiny-7">
                    <h3 className="footer-titles">Product</h3>
                    <p className="footer-links">
                      <a href target="_blank">
                        <span className="footer-link">Bao lì xì<br /></span>
                      </a><a href>
                      </a><a href target="_blank">
                        <span className="footer-link">Khô<br /></span>
                      </a><a href>
                      </a><a href target="_blank">
                        <span className="footer-link">Áo in<br /></span>
                      </a><a href>
                      </a><a href target="_blank">
                        <span className="footer-link">Ngoại tệ<br /></span>
                      </a><a href>
                      </a></p></div><a href>
                  </a><div className="w-col w-col-5 w-col-small-6 w-col-tiny-5"><a href>
                      <h3 className="footer-titles">Other</h3>
                    </a><p className="footer-links"><a href>
                      </a><a href><span className="footer-link">About<br /></span></a>
                      <a href><span className="footer-link">Contact<br /></span></a>
                      <a href><span className="footer-link" /></a>
                      <a href><span className="footer-link">Cart<br /></span></a>
                      <a href><span className="footer-link">FAQ</span></a><strong><br /></strong></p>
                  </div>
                </div>
              </div>
              <div className="column-center-mobile w-col w-col-4">
                <h3 className="footer-titles">Follow Us!</h3>
                <a href target="_blank" className="footer-social-network-icons w-inline-block"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/5c8dbf0a2f2b67e3b3ba079c_Twitter%20Icon.svg" width={20} alt="Twitter icon" /></a>
                <a href target="_blank" className="footer-social-network-icons w-inline-block"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/5c8dbfe70fcf5a0514c5b1da_Instagram%20Icon.svg" width={20} alt="Instagram icon" /></a>
                <a href target="_blank" className="footer-social-network-icons w-inline-block"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/5c8dbe42e1e6034fdaba46f6_Facebook%20Icon.svg" width={20} alt="Facebook Icon" /></a>
                <a href target="_blank" className="footer-social-network-icons w-inline-block"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/5c8dc0002f2b676eb4ba0869_LinkedIn%20Icon.svg" width={20} alt="LinkedIn Icon" /></a>
                <a href target="_blank" className="footer-social-network-icons w-inline-block"><img src="https://uploads-ssl.webflow.com/5966ea9a9217ca534caf139f/5c8dc0112f2b6739c9ba0871_Pinterest%20Icon.svg" width={20} alt="Pinterest Icon" className /></a>
                <p className="footer-description">Email me at: <a href><strong className="link-email-footer">gunnerkma@gmail.com</strong></a><br /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Footer
