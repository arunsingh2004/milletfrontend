import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./AnchorTemporaryDrawer.css";
import zIndex from "@mui/material/styles/zIndex";

const categories = [
  {
    category: "Shop by diet",
    subcategories: ["Keto", "Vegan", "Gluten Free"],
  },
  {
    category: "Shop by concern",
    subcategories: ["Weight Loss", "Heart Health", "Diabetes"],
  },
  {
    category: "Shop by customization",
    subcategories: ["Diwali Season", "Festive Pack"],
  },
  {
    category: "Shop by category",
    subcategories: ["Snacks", "Supplements", "Drinks"],
  },
  {
    category: "Others",
    subcategories: ["Miscellaneous 1", "Miscellaneous 2"],
  },
];

export default function AnchorTemporaryDrawer({ open, toggleDrawer }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const handleSubcategoryClick = () => {
    toggleDrawer(false);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categories.map((categoryObj) => (
          <div key={categoryObj.category}>
            <Button
              fullWidth
              style={{
                fontWeight: "bold",
                color: "black",
                textTransform: "none",
              }}
              onClick={() => handleCategoryClick(categoryObj.category)}
            >
              {categoryObj.category}
            </Button>
            {expandedCategory === categoryObj.category &&
              categoryObj.subcategories.map((subcategory) => (
                <Button
                  key={subcategory}
                  component={Link}
                  to={`/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                  fullWidth
                  style={{
                    color: "black",
                    textTransform: "none",
                    paddingLeft: "20px",
                  }}
                  onClick={() => {
                    handleSubcategoryClick();
                    toggleDrawer(false);
                  }}
                >
                  {subcategory}
                </Button>
              ))}
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
