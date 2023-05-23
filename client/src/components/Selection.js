import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selection.css";
import Progress from "./Progress";
import Menu from "./Menu";
import { getMealResult } from "./Memoization";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

function Selection(props) {
  //products to store database information, loading for useEffect rendering

  const [products, setProducts] = useState([]);
  //const [userinfos, setUserinfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set the flag to true when the component is mounted
    setMounted(true);

    // Clean up the event listeners when the component is unmounted
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data only if the component is mounted
      if (mounted) {
        try {
          const response = await axios.get("http://localhost:3500/api");
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [mounted]);

  //this will be fetched from other js file and database on future*/
  const userMealType = props.type;
  const userMealStyle = props.style;
  const totalCal = props.cal;
  const userAllergen = props.allergen;
  const userUnPreffer = props.unPreffer;
  const carbTotal = Math.round(((totalCal / 100) * 50) / 4);
  const proteinTotal = Math.round(((totalCal / 100) * 15) / 4);
  const fatTotal = Math.round(((totalCal / 100) * 35) / 9);

  let mealResult = Array(8).fill("");
  if (!loading) {
    mealResult = getMealResult(
      userMealType,
      userMealStyle,
      products,
      userUnPreffer,
      userAllergen,
      totalCal
    );
  }

  console.log(mealResult);

  const fixedBreakfastProduct = mealResult[0];
  const fixedLunchProduct = mealResult[1];
  const fixedDinnerProduct = mealResult[2];
  const fixedSnackProduct = mealResult[3];
  const fixedCalVal = mealResult[4];
  const fixedCarbVal = mealResult[5];
  const fixedProteinVal = mealResult[6];
  const fixedFatVal = mealResult[7];

  const breakfastFirstSelect = {
    name: fixedBreakfastProduct ? fixedBreakfastProduct.label : "breakfast",
  };

  const lunchFirstSelect = {
    name: fixedLunchProduct ? fixedLunchProduct.label : "lunch",
  };

  const dinnerFirstSelect = {
    name: fixedDinnerProduct ? fixedDinnerProduct.label : "dinner",
  };
  const snackFirstSelect = {
    name: fixedSnackProduct ? fixedSnackProduct.label : "snack",
  };

  //fetch image from api
  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});
  const [snack, setSnack] = useState({});
  useEffect(() => {
    const fetchBreakfastImages = async () => {
      // Fetch breakfast images only if the component is mounted
      if (mounted) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${breakfastFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0];
            const recipe = firstHit.recipe;
            if (recipe.image) {
              setBreakfast(recipe.image);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    // Call the fetchBreakfastImages function
    fetchBreakfastImages();
  }, [mounted, fixedBreakfastProduct.label]);

  useEffect(() => {
    const fetchLunchImages = async () => {
      if (mounted) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${lunchFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setLunch(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchLunchImages();
  }, [mounted, fixedLunchProduct.label]);

  useEffect(() => {
    const fetchDinnerImages = async () => {
      if (mounted) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${dinnerFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setDinner(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDinnerImages();
  }, [mounted, fixedDinnerProduct.label]);

  useEffect(() => {
    const fetchSnackImages = async () => {
      if (mounted) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${snackFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setSnack(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSnackImages();
  }, [mounted, fixedSnackProduct.label]);

  //make objects based on selected meals by generator
  //image will be fetched with function later
  const breakfastSelect = {
    name: fixedBreakfastProduct ? fixedBreakfastProduct.label : "skip",
    img:
      fixedBreakfastProduct && fixedBreakfastProduct.label === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : breakfast
        ? breakfast
        : "image",
  };

  const lunchSelect = {
    name: fixedLunchProduct ? fixedLunchProduct.label : "skip",
    img:
      fixedLunchProduct && fixedLunchProduct.label === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : lunch
        ? lunch
        : "image",
  };

  const dinnerSelect = {
    name: fixedDinnerProduct ? fixedDinnerProduct.label : "skip",
    img:
      fixedDinnerProduct && fixedDinnerProduct.label === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : dinner
        ? dinner
        : "image",
  };
  const snackSelect = {
    name: fixedSnackProduct ? fixedSnackProduct.label : "skip",
    img:
      fixedSnackProduct && fixedSnackProduct.label === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : snack
        ? snack
        : "image",
  };

  const mealArray = [breakfastSelect, lunchSelect, dinnerSelect, snackSelect];
  window.mealArray = mealArray;
  const mealPlanInfo = [
    totalCal,
    fixedCalVal,
    carbTotal,
    fixedCarbVal,
    proteinTotal,
    fixedProteinVal,
    fatTotal,
    fixedFatVal,
  ];
  window.mealPlanInfo = mealPlanInfo;
  console.log(mealArray);
  console.log(mealPlanInfo);
  // Declare a global variable to track the render count
  window.renderCount = (window.renderCount || 0) + 1;

  // Log the render count to the console
  console.log(`Render count: ${window.renderCount}`);
  console.log(
    breakfastSelect.name,
    lunchSelect.name,
    dinnerSelect.name,
    snackSelect.name
  );

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="testing">
            <div className="progress-container">
              <Progress
                heading="Calories"
                value={fixedCalVal}
                total={totalCal}
              />
              <Progress heading="Carb" value={fixedCarbVal} total={carbTotal} />
              <Progress
                heading="Protein"
                value={fixedProteinVal}
                total={proteinTotal}
              />
              <Progress heading="Fat" value={fixedFatVal} total={fatTotal} />
            </div>
            <div className="popup-result">
              <div className="item breakfast">
                <div className="item-heading">
                  <h3>Breakfast</h3>
                </div>
                {breakfastSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={breakfastSelect.img}
                    alt={breakfastSelect.name}
                    menu={breakfastSelect.name}
                  />
                )}
              </div>
              <div className="item lunch">
                <div className="item-heading">
                  <h3>Lunch</h3>
                </div>
                {lunchSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={lunchSelect.img}
                    alt={lunchSelect.name}
                    menu={lunchSelect.name}
                  />
                )}
              </div>
              <div className="item dinner">
                <div className="item-heading">
                  <h3>Dinner</h3>
                </div>
                {dinnerSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={dinnerSelect.img}
                    alt={dinnerSelect.name}
                    menu={dinnerSelect.name}
                  />
                )}
              </div>
              <div className="item snack">
                <div className="item-heading">
                  <h3>Snack</h3>
                </div>
                {snackSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={snackSelect.img}
                    alt={snackSelect.name}
                    menu={snackSelect.name}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Selection;
