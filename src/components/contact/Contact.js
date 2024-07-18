import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { ReactComponent as FacebookIcon } from "../../assets/icons/Facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/Instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/Twitter.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/Google.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/LinkedIn.svg";
import "./Contact.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="text-center">Contact Us</h2>
      <div className="contact-content">
        <div className="contact-section">
          <h4>Contact Information</h4>
          <p>
            <MDBIcon color="secondary" icon="home" className="me-2" />
            New Delhi, New Delhi, INDIA
          </p>
          <p>
            <MDBIcon color="secondary" icon="envelope" className="me-3" />
            MilleteOdyssey@gmail.com
          </p>
          <p>
            <MDBIcon color="secondary" icon="phone" className="me-3" /> + 00 000
            000 00
          </p>
          <p>
            <MDBIcon color="secondary" icon="print" className="me-3" /> + 00 000
            000 00
          </p>
        </div>
        {/* <div className="contact-section">
          <h4>Follow Us</h4>
          <div className="contact-icons">
            <a href="https://www.facebook.com" className="me-4">
              <FacebookIcon width={40} height={40} color="black" />
            </a>
            <a href="https://www.twitter.com" className="me-4">
              <TwitterIcon width={40} height={40} color="black" />
            </a>
            <a href="https://www.google.com" className="me-4">
              <GoogleIcon width={40} height={40} color="black" />
            </a>
            <a href="https://www.instagram.com" className="me-4">
              <InstagramIcon width={40} height={40} color="black" />
            </a>
            <a href="https://www.linkedin.com" className="me-4">
              <LinkedinIcon width={40} height={40} color="black" />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
