import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { ReactComponent as FacebookIcon } from "../../assets/icons/Facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/Instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/Twitter.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/Google.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/LinkedIn.svg";
import "./footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#CF7D08" }}
      className="text-center text-xxl text-muted"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span className="footer-top-text">
            Get connected with us on social networks:
          </span>
        </div>

        <div className="link">
          <Link href="https://www.facebook.com" className="me-4 ">
            <FacebookIcon width={40} height={40} color="red" />
          </Link>
          <Link href="https://www.twitter.com" className="me-4 ">
            <TwitterIcon width={40} height={40} color="red" />
          </Link>
          <Link href="https://www.google.com" className="me-4 ">
            <GoogleIcon width={40} height={40} color="red" />
          </Link>
          <Link href="https://www.instagram.com" className="me-4 ">
            <InstagramIcon width={40} height={40} color="red" />
          </Link>
          <Link href="https://www.linkedin.com" className="me-4 ">
            <LinkedinIcon width={40} height={40} color="red" />
          </Link>
        </div>
      </section>

      <section className="Footerdescription">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="secondary" icon="gem" className="me-3" />
                The Millet Odyssey
              </h6>
              <p>
                The Millet Odyssey is an e-commerce website dedicated to
                offering a wide range of millet-based products, catering to the
                growing demand for healthy and sustainable food options.The
                Millet Odyssey aims to capitalize on this trend by providing
                consumers with easy access to high-quality millet products.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link href="#!" className="">
                  Shop By Diet
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Shop By Concern
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Shop By Customization
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Shop By Category
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link href="#!" className="">
                  Pricing
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Settings
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Orders
                </Link>
              </p>
              <p>
                <Link href="#!" className="">
                  Help
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                New Delhi, New Delhi, INDIA
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                MilleteOdyssey@gmail.com
              </p>
              <p>
                <MDBIcon color="secondary" icon="phone" className="me-3" /> + 00
                000 000 00
              </p>
              <p>
                <MDBIcon color="secondary" icon="print" className="me-3" /> + 00
                000 000 00
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <Link className=" fw-bold" style={{ color: "black" }} href="">
          MilleteOdyssey.com
        </Link>
      </div>
    </MDBFooter>
  );
}
