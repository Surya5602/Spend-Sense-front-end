import {
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import './categoryTab.css'

const CategoryTab = ({ arrays }) => {
  const [visibleSubCategory, setVisibleSubCategory] = useState([]);
  const toggleSubCategoryVisibility = (categoryId) => {
    if (visibleSubCategory === categoryId) {
      setVisibleSubCategory(null);
    } else {
      setVisibleSubCategory(categoryId);
    }
  };
  return (
    <div>
      {arrays.map((array, index) => (
        <div className="totalTab" key={index}>
          <div
            className="categoryTab"
            onClick={() => toggleSubCategoryVisibility(array.id)}
          >
            <div className="singleElement">
              <img src={array.picture} alt={`${array.name}-image`} />
              <p>{array.name}</p>
            </div>
            <div className="flex">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
          {visibleSubCategory === array.id && (
            <div className="subCategoryTab">
              {array.subCategories.map((subCategory) => (
                <div className="flex space-between pr3" key={subCategory.id}>
                  <div className="singleElement">
                    <img
                      src={subCategory.picture}
                      alt={`${subCategory.name}-image`}
                    />
                    <p>{subCategory.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default CategoryTab;
