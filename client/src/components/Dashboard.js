import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./Dashboard.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3500/history");
  return response.data;
};
const Dashboard = () => {
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

  const notCreated = {
    meal: '[{"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}, {"img": "", "name": "Not created"}]',
  };
  const today = new Date();
  const d1day = new Date(today);
  d1day.setDate(d1day.getDate() - 1);
  const d2day = new Date(d1day);
  d2day.setDate(d1day.getDate() - 1);
  const d3day = new Date(d2day);
  d3day.setDate(d2day.getDate() - 1);
  const todayFormatted = today.toISOString().slice(0, 10);
  const d1dayFormatted = d1day.toISOString().slice(0, 10);
  const d2dayFormatted = d2day.toISOString().slice(0, 10);
  const d3dayFormatted = d3day.toISOString().slice(0, 10);

  const todayItem = mealLog
    .filter((item) => item.created_at.slice(0, 10) === todayFormatted)
    .sort((a, b) => b.id - a.id)[0];
  const d1dayItem = mealLog
    .filter((item) => item.created_at.slice(0, 10) === d1dayFormatted)
    .sort((a, b) => b.id - a.id)[0];
  const d2dayItem = mealLog
    .filter((item) => item.created_at.slice(0, 10) === d2dayFormatted)
    .sort((a, b) => b.id - a.id)[0];
  const d3dayItem = mealLog
    .filter((item) => item.created_at.slice(0, 10) === d3dayFormatted)
    .sort((a, b) => b.id - a.id)[0];

  const d1dayItemMeal =
    d1dayItem && d1dayItem.meal ? d1dayItem.meal : notCreated.meal;
  const parsedD1dayItemMeal = d1dayItemMeal && JSON.parse(d1dayItemMeal);
  const d1dayBreakfast = parsedD1dayItemMeal && parsedD1dayItemMeal[0];
  const d1dayLunch = parsedD1dayItemMeal && parsedD1dayItemMeal[1];
  const d1dayDinner = parsedD1dayItemMeal && parsedD1dayItemMeal[2];
  const d1daySnack = parsedD1dayItemMeal && parsedD1dayItemMeal[3];

  const d2dayItemMeal =
    d2dayItem && d2dayItem.meal ? d2dayItem.meal : notCreated.meal;
  const parsedD2dayItemMeal = d2dayItemMeal && JSON.parse(d2dayItemMeal);
  const d2dayBreakfast = parsedD2dayItemMeal && parsedD2dayItemMeal[0];
  const d2dayLunch = parsedD2dayItemMeal && parsedD2dayItemMeal[1];
  const d2dayDinner = parsedD2dayItemMeal && parsedD2dayItemMeal[2];
  const d2daySnack = parsedD2dayItemMeal && parsedD2dayItemMeal[3];

  const d3dayItemMeal =
    d3dayItem && d3dayItem.meal ? d3dayItem.meal : notCreated.meal;
  const parsedD3dayItemMeal = d3dayItemMeal && JSON.parse(d3dayItemMeal);
  const d3dayBreakfast = parsedD3dayItemMeal && parsedD3dayItemMeal[0];
  const d3dayLunch = parsedD3dayItemMeal && parsedD3dayItemMeal[1];
  const d3dayDinner = parsedD3dayItemMeal && parsedD3dayItemMeal[2];
  const d3daySnack = parsedD3dayItemMeal && parsedD3dayItemMeal[3];

  return (
    <>
      {loadingDash ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid container_grid">
            <div className="header">1 day ago</div>
            <div className="header">2 day ago</div>
            <div className="header">3 day ago</div>
            <div className="item">
              <p>Breakfast: {d1dayBreakfast.name}</p>
              <p>Lunch: {d1dayLunch.name}</p>
              <p>Dinner: {d1dayDinner.name}</p>
              <p>Snack: {d1daySnack.name}</p>
            </div>
            <div className="item">
              <p>Breakfast: {d2dayBreakfast.name}</p>
              <p>Lunch: {d2dayLunch.name}</p>
              <p>Dinner: {d2dayDinner.name}</p>
              <p>Snack: {d2daySnack.name}</p>
            </div>
            <div className="item">
              <p>Breakfast: {d3dayBreakfast.name}</p>
              <p>Lunch: {d3dayLunch.name}</p>
              <p>Dinner: {d3dayDinner.name}</p>
              <p>Snack: {d3daySnack.name}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

ReactDOM.render(<Dashboard />, document.getElementById("root"));
export default Dashboard;
