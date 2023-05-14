import React, { useState, useEffect } from "react";
import "./Generation.css";
import PopPage from "./PopPage";
import PopResult from "./PopResult";
import "./PopPage.css";
import Progress from "./Progress";
import Menu from "./Menu";
import axios from "../api/axios";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3500/history");
  return response.data;
};
function Generation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mealLog, setmealLog] = useState([]);
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getMealLog = async () => {
      try {
        const data = await fetchData();
        console.log("It is fetching data");
        if (isMounted) {
          setmealLog(data);
          setLoadingDash(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMealLog();

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(mealLog);
  const notCreated = {
    meal: '[{"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}]',
    info: "[0, 0, 0, 0, 0, 0, 0, 0]",
  };

  const today = new Date();
  const todayFormatted = today.toISOString().slice(0, 10);
  const todayItem = mealLog
    .filter((item) => item.created_at.slice(0, 10) === todayFormatted)
    .sort((a, b) => b.id - a.id)[0];
  console.log(todayItem);
  const todayItemMeal = todayItem && todayItem.meal ? todayItem : notCreated;
  const parsedtodayItemMeal = JSON.parse(todayItemMeal.meal);
  const parsedtodayMealInfo = JSON.parse(todayItemMeal.info);
  const totalCal = parsedtodayMealInfo[0];
  const calVal = parsedtodayMealInfo[1];
  const carbTotal = parsedtodayMealInfo[2];
  const carbVal = parsedtodayMealInfo[3];
  const proteinTotal = parsedtodayMealInfo[4];
  const proteinVal = parsedtodayMealInfo[5];
  const fatTotal = parsedtodayMealInfo[6];
  const fatVal = parsedtodayMealInfo[7];
  console.log(parsedtodayItemMeal); // contains the meal section of today's item

  const todayBreakfast = parsedtodayItemMeal && parsedtodayItemMeal[0];
  const todayLunch = parsedtodayItemMeal && parsedtodayItemMeal[1];
  const todayDinner = parsedtodayItemMeal && parsedtodayItemMeal[2];
  const todaySnack = parsedtodayItemMeal && parsedtodayItemMeal[3];

  if (todayItem && todayItem.meal && todayItem.meal !== notCreated.meal) {
    window.subSituation = 200;
  } else {
    window.subSituation = 150;
  }

  function openPopup() {
    setIsOpen(true);
    window.subSituation = 150;
    console.log(window.subSituation);
    document.body.classList.add("popup-open");
  }

  function closePopup() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }

  const [countSet, setCountSet] = useState(0);
  function setAgain() {
    window.subSituation = 150;
    console.log(window.subSituation);
    setCountSet(countSet + 1);
  }
  console.log(window.subSituation);

  return (
    <>
      {window.subSituation === 150 ? (
        <>
          <button onClick={openPopup} className="button-recommend">
            Get Recommendation
          </button>
          {isOpen && (
            <div className="popup">
              <div className="popup-inner">
                <PopPage></PopPage>
                <button className="close-button" onClick={closePopup}>
                  X
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="progress-container">
            <Progress heading="Calories" value={calVal} total={totalCal} />
            <Progress heading="Carb" value={carbVal} total={carbTotal} />
            <Progress
              heading="Protein"
              value={proteinVal}
              total={proteinTotal}
            />
            <Progress heading="Fat" value={fatVal} total={fatTotal} />
          </div>
          <div className="popup-result">
            <div className="item breakfast">
              <div className="item-heading">
                <h3>Breakfast</h3>
              </div>
              <Menu
                img={todayBreakfast.img}
                alt={todayBreakfast.name}
                menu={todayBreakfast.name}
              ></Menu>
            </div>
            <div className="item lunch">
              <div className="item-heading">
                <h3>Lunch</h3>
              </div>
              <Menu
                img={todayLunch.img}
                alt={todayLunch.name}
                menu={todayLunch.name}
              ></Menu>
            </div>
            <div className="item dinner">
              <div className="item-heading">
                <h3>Dinner</h3>
              </div>
              <Menu
                img={todayDinner.img}
                alt={todayDinner.name}
                menu={todayDinner.name}
              ></Menu>
            </div>
            <div className="item snack">
              <div className="item-heading">
                <h3>Snack</h3>
              </div>
              <Menu
                img={todaySnack.img}
                alt={todaySnack.name}
                menu={todaySnack.name}
              ></Menu>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Generation;
