// src/components/ProductManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: null,
    additionalImages: [],
    details: "",
  });
  const [activeTab, setActiveTab] = useState("products");
  const [bannerAds, setBannerAds] = useState([]);
  const [newBannerAd, setNewBannerAd] = useState({
    type: "",
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchBannerAds();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBannerAds = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bannerAds`
      );
      setBannerAds(response.data);
    } catch (error) {
      console.error("Error fetching banner ads:", error);
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("type", newProduct.type);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("imageUrl", newProduct.imageUrl);
    newProduct.additionalImages.forEach((file) => {
      formData.append("additionalImages", file);
    });
    formData.append("details", newProduct.details);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        type: "",
        description: "",
        price: 0,
        quantity: 0,
        imageUrl: null,
        additionalImages: [],
        details: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (id) => {
    const productToUpdate = products.find((product) => product.id === id);
    const formData = new FormData();
    formData.append("name", productToUpdate.name);
    formData.append("type", productToUpdate.type);
    formData.append("description", productToUpdate.description);
    formData.append("price", productToUpdate.price);
    formData.append("quantity", productToUpdate.quantity);
    formData.append("imageUrl", productToUpdate.imageUrl);
    productToUpdate.additionalImages.forEach((file) => {
      formData.append("additionalImages", file);
    });
    formData.append("details", productToUpdate.details);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddAdditionalImage = () => {
    setNewProduct({
      ...newProduct,
      additionalImages: [...newProduct.additionalImages, null],
    });
  };

  const handleAdditionalImageChange = (index, files) => {
    const updatedImages = newProduct.additionalImages.map((img, i) =>
      i === index ? files[0] : img
    );
    setNewProduct({
      ...newProduct,
      additionalImages: updatedImages,
    });
  };

  const handleProductAdditionalImageChange = (productId, imageIndex, files) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedImages = product.additionalImages.map((img, i) =>
          i === imageIndex ? files[0] : img
        );
        return { ...product, additionalImages: updatedImages };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleAddProductAdditionalImage = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          additionalImages: [...product.additionalImages, null],
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "imageUrl") {
      setNewProduct({ ...newProduct, imageUrl: files[0] });
    } else if (name === "additionalImages") {
      setNewProduct({ ...newProduct, additionalImages: Array.from(files) });
    } else {
      setNewBannerAd({ ...newBannerAd, image: files[0] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBannerAd({ ...newBannerAd, [name]: value });
  };

  const handleUploadBannerAd = async () => {
    const formData = new FormData();
    formData.append("type", newBannerAd.type);
    formData.append("title", newBannerAd.title);
    formData.append("description", newBannerAd.description);
    formData.append("image", newBannerAd.image);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/bannerAds`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchBannerAds();
      setNewBannerAd({ type: "", title: "", description: "", image: null });
    } catch (error) {
      console.error("Error uploading banner ad:", error);
    }
  };

  const handleDeleteBannerAd = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/bannerAds/${id}`
      );
      fetchBannerAds();
    } catch (error) {
      console.error("Error deleting banner ad:", error);
    }
  };

  return (
    <div className="container1">
      <h2>Product Management</h2>
      <div className="tabs">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
      </div>
      {activeTab === "products" && (
        <div>
          <h3>Add New Product</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              placeholder="Type"
              value={newProduct.type}
              onChange={(e) =>
                setNewProduct({ ...newProduct, type: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="imageUrl" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea
              placeholder="Details"
              value={newProduct.details}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Additional Images</label>
            {newProduct.additionalImages.map((_, index) => (
              <div key={index}>
                <input
                  type="file"
                  onChange={(e) =>
                    handleAdditionalImageChange(index, e.target.files)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAdditionalImage}
              className="add-image-button"
            >
              Add Additional Image
            </button>
          </div>
          <button onClick={handleAddProduct}>Add Product</button>

          <h3>Existing Products</h3>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Details</th>
                <th>Additional Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, name: e.target.value }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.type}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, type: e.target.value }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, description: e.target.value }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, price: parseFloat(e.target.value) }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, quantity: parseInt(e.target.value) }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      name="imageUrl"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const updatedProducts = products.map((p) =>
                          p.id === product.id ? { ...p, imageUrl: file } : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <textarea
                      value={product.details}
                      onChange={(e) => {
                        const updatedProducts = products.map((p) =>
                          p.id === product.id
                            ? { ...p, details: e.target.value }
                            : p
                        );
                        setProducts(updatedProducts);
                      }}
                    />
                  </td>
                  <td>
                    {product.additionalImages.map((image, index) => (
                      <div key={index}>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleProductAdditionalImageChange(
                              product.id,
                              index,
                              e.target.files
                            )
                          }
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddProductAdditionalImage(product.id)
                      }
                      className="add-image-button"
                    >
                      Add Additional Image
                    </button>
                  </td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleUpdateProduct(product.id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "about" && (
        <div className="banner-ad-management">
          <h2>Banner Ad Management</h2>
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={newBannerAd.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newBannerAd.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newBannerAd.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <button onClick={handleUploadBannerAd}>Upload Banner Ad</button>
          <h3>Existing Banner Ads</h3>
          <ul>
            {bannerAds.map((ad) => (
              <li key={ad.id}>
                <img src={ad.imageUrl} alt={ad.title} />
                <h4>{ad.title}</h4>
                <p>{ad.description}</p>
                <button onClick={() => handleDeleteBannerAd(ad.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
