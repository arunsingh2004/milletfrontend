import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import "./AboutPage.css"; // Include custom styles here if necessary

const About = () => {
  const [aboutPage, setAboutPage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    banner: "",
    title: "",
    description: "",
    journey: { title: "", description: "" },
    promises: { title: "", description: "" },
    ingredient: { title: "", description: "" },
  });

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/about/`
        );
        setAboutPage(response.data[0]); // Assuming there's only one AboutPage
        setFormData({
          banner: response.data[0].banner,
          title: response.data[0].title,
          description: response.data[0].description,
          journey: response.data[0].journey,
          promises: response.data[0].promises,
          ingredient: response.data[0].ingredient,
        });
      } catch (error) {
        console.error("Error fetching About Page:", error);
      }
    };

    fetchAboutPage();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/about/${aboutPage.id}`,
        formData
      );
      setAboutPage(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating About Page:", error);
    }
  };

  if (!aboutPage) return <div>Loading...</div>;

  return (
    <Container className="about-page">
      <h1 className="about-title">
        {isEditing ? "Edit About Us" : aboutPage.title}
      </h1>
      {/* {isEditing ? (
        <>
          <input
            type="text"
            className="form-control mb-3"
            value={formData.banner}
            onChange={(e) =>
              setFormData({ ...formData, banner: e.target.value })
            }
            placeholder="Banner URL"
          />
          <input
            type="text"
            className="form-control mb-3"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            className="form-control mb-3"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
          ></textarea>
          {["journey", "promises", "ingredient"].map((section) => (
            <div key={section}>
              <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
              <input
                type="text"
                className="form-control mb-2"
                value={formData[section].title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [section]: {
                      ...formData[section],
                      title: e.target.value,
                    },
                  })
                }
                placeholder={`${section} Title`}
              />
              <textarea
                className="form-control mb-3"
                rows="3"
                value={formData[section].description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [section]: {
                      ...formData[section],
                      description: e.target.value,
                    },
                  })
                }
                placeholder={`${section} Description`}
              ></textarea>
            </div>
          ))}
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </>
      ) : ( */}
      <>
        <img src={aboutPage.banner} alt="Banner" className="about-banner" />
        <p className="about-content">{aboutPage.description}</p>
        {["journey", "promises", "ingredient"].map((section) => (
          <div key={section}>
            <h2>{aboutPage[section].title}</h2>
            <p className="about-section">{aboutPage[section].description}</p>
          </div>
        ))}
        {/* <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button> */}
      </>
      {/* )} */}
    </Container>
  );
};

export default About;
