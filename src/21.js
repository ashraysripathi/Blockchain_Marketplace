import logo from './logo.svg';
import React, { useEffect,useState } from "react";
import './App.css';
import Navbar from './Navbar'
import Web3 from 'web3';
import {testStr, init, registerCreator, registerCustomer, newListing} from './Web3Client'

function App() {

  init();

  const [balance, setBalance] = useState(1);

const gettest=()=>{

  testStr().then((balance)=>{setBalance(balance);}).catch((err)=>{
    console.log(err)
  });
}

const regCreator=()=>{
registerCreator().catch((err)=>console.log(err));
}
const regCustomer=()=>{
  registerCustomer().catch((err)=>console.log(err));
  }
const handleNewProduct=(event)=>{
  event.preventDefault();
  
  console.log(event.target.price.value)
//newListing(price).catch((err)=>console.log(err));
  
}
const [price, setPrice] = React.useState(0);
  const handleSubmitListing = e => {
    e.preventDefault();
    newListing(price);
  };

  
  return (
    <div className="App">
  
      <h1>Hello World22</h1>
      <p>Your balance is {balance}</p>
      <button onClick={() => gettest()}>Refresh balance</button>
      <button onClick={() => regCreator()}>Register Creator</button>
      <button onClick={() => regCustomer()}>Register Customer</button>
      <br></br>
      <form onSubmit={handleSubmitListing}>
        <label> Enter Price
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
    
  );
}

export default App;
