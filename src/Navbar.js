
import React, { Component } from 'react';
import {  Link } from "react-router-dom";
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" target="_blank" rel="noopener noreferrer"><Link to="/" >Cantina</Link></a>
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" target="_blank" rel="noopener noreferrer"><Link to="/dogs" >Commission</Link></a>
     
        
          
        <p className='text-white'>Account: {this.props.account} </p>
        <p className='text-white'>Balance: {this.props.balance}</p>
        
        
      </nav>

    );
  }
}

export default Navbar;