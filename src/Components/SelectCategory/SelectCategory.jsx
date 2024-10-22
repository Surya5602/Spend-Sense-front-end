import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import "./selectCategory.css";

const SelectCategory = ({ type, selectedCategory , close}) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const showCategory = type === "income" ? incomes : expenses;
  const updateCategory = (image, name , id) => {
    selectedCategory((prevVal) => ({
      ...prevVal,
      name: name,
      image: image,
      id: id,

    }));
    close();
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/getCategoryData`);
        setIncomes(response.data.data.income);
        setExpenses(response.data.data.expense);
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };
    fetchCategory();
  }, []);
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
      {showCategory.map((array, index) => (
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
                <div
                  className="flex space-between pr3"
                  key={subCategory.id}
                  onClick={() =>
                    updateCategory(subCategory.picture, subCategory.name , subCategory.id)
                  }
                  value={subCategory.id}
                >
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
export default SelectCategory;
