import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const AboutPageManagement = () => {
  const [aboutPage, setAboutPage] = useState({
    title: "",
    description: "",
    banner: "",
    journey: { title: "", description: "" },
    promises: { title: "", description: "" },
    ingredient: { title: "", description: "" },
  });
  const [bannerFile, setBannerFile] = useState(null);

  useEffect(() => {
    fetchAboutPage();
  }, []);

  const fetchAboutPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/about/`
      );
      if (response.data.length > 0) {
        setAboutPage(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching About Page:", error);
    }
  };

  const handleUpdateAboutPage = async () => {
    try {
      const formData = new FormData();
      formData.append("title", aboutPage.title);
      formData.append("description", aboutPage.description);
      formData.append("journeyHeading", aboutPage.journey.title);
      formData.append("journeyContent", aboutPage.journey.description);
      formData.append("promisesHeading", aboutPage.promises.title);
      formData.append("promisesContent", aboutPage.promises.description);
      formData.append("ingredientHeading", aboutPage.ingredient.title);
      formData.append("ingredientContent", aboutPage.ingredient.description);

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/about/${aboutPage.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchAboutPage();
    } catch (error) {
      console.error("Error updating About Page:", error);
    }
  };

  const handleDeleteAboutPage = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/about/${aboutPage.id}`
      );
      setAboutPage({
        title: "",
        description: "",
        banner: "",
        journey: { title: "", description: "" },
        promises: { title: "", description: "" },
        ingredient: { title: "", description: "" },
      });
    } catch (error) {
      console.error("Error deleting About Page:", error);
    }
  };

  return (
    <div className="container">
      <h2>About Page Management</h2>
      <div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={aboutPage.title}
            onChange={(e) =>
              setAboutPage({ ...aboutPage, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={aboutPage.description}
            onChange={(e) =>
              setAboutPage({ ...aboutPage, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Banner URL</label>
          <input
            type="text"
            placeholder="Banner URL"
            value={aboutPage.banner}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Upload Banner</label>
          <input
            type="file"
            onChange={(e) => setBannerFile(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label>Journey Title</label>
          <input
            type="text"
            placeholder="Journey Title"
            value={aboutPage.journey.title}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                journey: { ...aboutPage.journey, title: e.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Journey Description</label>
          <textarea
            placeholder="Journey Description"
            value={aboutPage.journey.description}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                journey: { ...aboutPage.journey, description: e.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Promises Title</label>
          <input
            type="text"
            placeholder="Promises Title"
            value={aboutPage.promises.title}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                promises: { ...aboutPage.promises, title: e.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Promises Description</label>
          <textarea
            placeholder="Promises Description"
            value={aboutPage.promises.description}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                promises: {
                  ...aboutPage.promises,
                  description: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Ingredients Title</label>
          <input
            type="text"
            placeholder="Ingredients Title"
            value={aboutPage.ingredient.title}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                ingredient: { ...aboutPage.ingredient, title: e.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Ingredients Description</label>
          <textarea
            placeholder="Ingredients Description"
            value={aboutPage.ingredient.description}
            onChange={(e) =>
              setAboutPage({
                ...aboutPage,
                ingredient: {
                  ...aboutPage.ingredient,
                  description: e.target.value,
                },
              })
            }
          />
        </div>
        <button onClick={handleUpdateAboutPage}>Update About Page</button>
        <button
          onClick={handleDeleteAboutPage}
          style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}
        >
          Delete About Page
        </button>
      </div>
    </div>
  );
};

export default AboutPageManagement;
