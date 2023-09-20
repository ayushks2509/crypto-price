// import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";

import { makeStyles } from "@mui/styles";
import Alert from "./components/Alert";



const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));



function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
      <Routes>
      <Route path="/" Component={Homepage} />
      <Route path="/coins/:id" Component={Coinpage} />

      </Routes>
    </div>
    <Alert />
    </BrowserRouter>

    
  );
}

export default App;
