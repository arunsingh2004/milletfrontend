import React, { useState, useContext } from "react";
import "./mainBanner.css";
import { ReactComponent as EmailIcon } from "../../assets/icons/Email.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Modal } from "react-bootstrap";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { AuthContext } from "../../context/AuthContext";
import NewEmail from "../../assets/icons/email.png";

export const MainBanner = () => {
  const { bannerData, dataLoading, dataError } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

  const banner = bannerData.find((item) => item.type === "banner");

  if (dataLoading) return <div>Loading...</div>;
  if (dataError) return <div>Error: {dataError.message}</div>;
  if (!banner) return <div>No banner data available</div>;

  return (
    <MDBRow className="banner">
      <MDBCol className="banner-content">
        <Row className="banner-title">
          <div className="banner-text">
            {banner.title}
            <br />
            {banner.description}
          </div>
        </Row>
        <div
          className="banner-action"
          style={{
            height: "50px",
            backgroundColor: "white",
            borderRadius: "25px",
          }}
        >
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Title id="contained-modal-title-vcenter modal-title-custom">
              
              <div style={{padding: "8px", fontWeight: "bold", color: "#9c4a1a"}}>
              Subscribe for updates
              </div>

            </Modal.Title>
            <Modal.Body>
              <div className="banner-buttons">
                <div>
                  <Button variant="">
                    {/* <EmailIcon
                      width={40}
                      height={40}
                      color="red"
                      style={{ marginLeft: "10px"}}
                    /> */}
                    <img src={NewEmail} width={"40px"} height={"40px"}/>
                  </Button>
                </div>
                <div>
                  <input
                    placeholder="Your email address"
                    style={{
                      width: "80%",
                      border: "none",
                      marginTop: "10px",
                      fontSize: "16px",
                      fontWeight: "bolder",
                      color: "#CF7D08",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{backgroundColor: "#9c4a1a", outline: "none", border: "none"}}
                onClick={() => {
                  setModalShow(false);
                }}
              >
                Subscribe
              </Button>
            </Modal.Footer>
          </Modal>
          <div>
            <button
              style={{
                width: "150px",
                height: "54px",
                backgroundColor: "#f7f3ef",
                borderRadius: "25px",
                border: "none",
                color: "#9C4A1A",
                fontSize: "16px",
                fontWeight: "800",
              }}
              onClick={() => {
                setModalShow(true);
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </MDBCol>
      <MDBCol className="banner-image">
        <img className="img-banner" src={banner.imageurl} alt="Banner" />
      </MDBCol>
    </MDBRow>
  );
};
