import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { HistoricalChart } from "../Config/api";
import { Line } from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import SelectButton from "./SelectButton";
import { chartDays } from "../Config/data";

import { CryptoState } from "../CryptoContext";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "70%",
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    padding: 20,
  //   // [theme.breakpoints.down("md")]: {
  //     width: "100%",
  //     marginTop: 0,
  //     padding: 20,
  //     paddingTop: 0,
  //   // },
  },
}));

const CoinInfo = ({ coin }) => {
  
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData & (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D"
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            {
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <button
                  style={{
                    background: day.value === days ? "gold" : "none",
                    color: day.value === days ? "black" : "grey",
                    width: "23%",
                    border: "1px solid gold",
                    cursor: "pointer",
                    padding: "10px",
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    borderRadius: "5px",
                  }}
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </button>
                
                ))}
              </div>
            }
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
