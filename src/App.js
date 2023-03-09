import logo from './logo.svg';
import React, { useEffect,useState,Component } from "react";
import './App.css';
import Navbar from './Navbar'
import Dogs from "./Dogs"
import Web3 from 'web3';
import Main from './Main'
import Support from './Support'
import {testStr, init, registerCreator, registerCustomer, newListing} from './Web3Client'
import CantinaBuild from 'contracts/Cantina.json';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Main />
    </div>
  );
}
export default App;