import logo from './logo.svg';
import React, { useEffect,useState,Component } from "react";
import './App.css';
import Navbar from './Navbar'

import Web3 from 'web3';
import Main from './Main'
import Support2 from './Support2'
import Support3 from './Support3'
import {testStr, init, registerCreator, registerCustomer, newListing} from './Web3Client'
import CantinaBuild from 'contracts/Cantina.json';
import FiduciaBuild from 'contracts/Fiducia.json';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class Dogs extends Component{
  async componentDidMount() {
      await this.loadWeb3()
      await this.blockchainData()

      
    } 

    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }

    async blockchainData(){
        const web3=window.web3
        const accounts=await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
       
        const networkId = await web3.eth.net.getId()
        const networkData = CantinaBuild.networks[networkId]
        const tokenNettwork=FiduciaBuild.networks[networkId]
        window.ethereum.on('accountsChanged', function (accounts) {
          this.setState({ account: accounts[0] })

        })
        if(tokenNettwork){
          const tokencontract = new web3.eth.Contract(FiduciaBuild.abi, tokenNettwork.address)
          
          const tokenAddress=tokencontract._address
          this.setState({tokenAddress})
          this.setState({ tokencontract })
          //console.log(this.state.tokenAddress)
          //tokencontract.methods.balanceOf(this.state.account).call().then((value) => { this.setState({balance}) })
          const balance = await tokencontract.methods.balanceOf(this.state.account).call()

          this.setState({ balance })



        }
        if(networkData) {
          
          const marketplace = new web3.eth.Contract(CantinaBuild.abi, networkData.address)
          const tokencontract = new web3.eth.Contract(FiduciaBuild.abi, networkData.address)
          console.log(marketplace)
          this.setState({ marketplace })
          const productCount = await marketplace.methods.nrProducts().call()
          this.setState({ productCount })
          const UserType=await marketplace.methods.userType(this.state.account).call()
          this.setState({userType:UserType})
          const commCount = await marketplace.methods.nrComissions().call()
          for (var i = 0; i < commCount; i++) {
              const comm = await marketplace.methods.comissionDetails(i).call()
              console.log(comm)
              this.setState({
                commissions: [...this.state.commissions, comm]
              })
            }
  
    
          } else {
            window.alert('Marketplace contract not deployed to detected network.')
          }
          

    }
    constructor(props){
      super(props)
        this.state={
          'account':'',
          productCount:0,
          products:[],
          commCount:0,
          commissions:[],
          loading:true,
          userType:0,
          balance:0,
          'contractAddress':''
        }
        this.createProduct=this.createProduct.bind(this)
        this.regCustomer=this.regCustomer.bind(this)
        this.regCreator=this.regCreator.bind(this)
        this.buyProduct=this.buyProduct.bind(this)
        this.reqComm=this.reqComm.bind(this)
        this.respComm=this.respComm.bind(this)
        this.completeComm=this.completeComm.bind(this)
        this.payComm=this.payComm.bind(this)
    
    }

    
    createProduct(name,price){
      this.setState({loading:true})
      this.state.marketplace.methods.createListing(price,name).send({from:this.state.account}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    regCustomer(){
      this.setState({loading:true})
      this.state.marketplace.methods.registerCustomer().send({from:this.state.account})
      this.setState({loading:false})
    }
    regCreator(){
      this.setState({loading:true})
      this.state.marketplace.methods.registerCreator().send({from:this.state.account,value:"10000"})
      this.setState({loading:false})
    }

    buyProduct(id,price){
      this.setState({loading:true})
      this.state.marketplace.methods.buy(id).send({from:this.state.account,value:price}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    reqComm(rate,hrs,addr){
      this.setState({loading:true})
      this.state.marketplace.methods.requestCommission(rate,hrs,addr).send({from:this.state.account}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    respComm(id){
      this.setState({loading:true})
      this.state.marketplace.methods.responseCommission(id).send({from:this.state.account}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    completeComm(id){
      this.setState({loading:true})
      this.state.marketplace.methods.completeCommission(id).send({from:this.state.account}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    payComm(id,price){
      this.state.tokencontract.methods.approve(this.state.contractAddress,price).send({from:this.state.account})
      this.setState({loading:true})
      this.state.marketplace.methods.payComission(id).send({from:this.state.account,value:price}).once('reciept',(reciept)=>{
        this.setState({loading:false})
      })
    }
    

  render(){
      return(
  
          <div>
              
            <Navbar account={this.state.account} balance={this.state.balance}/>

              <div className="container-fluid mt-5">
              <div className="row">
              <main role="main" className="col-lg-12 d-flex">
              {this.state.userType==2?
           <Support2 
              products={this.state.products}
              commissions={this.state.commissions}
              regCreator={this.regCreator}
              regCustomer={this.regCustomer}
              createProduct={this.createProduct}
              buyProduct={this.buyProduct}
              reqComm={this.reqComm}
              respComm={this.respComm}
              completeComm={this.completeComm}
              payComm={this.payComm}
              
              />

              :            <Support3 
              products={this.state.products}
              commissions={this.state.commissions}
              regCreator={this.regCreator}
              regCustomer={this.regCustomer}
              createProduct={this.createProduct}
              buyProduct={this.buyProduct}
              reqComm={this.reqComm}
              respComm={this.respComm}
              completeComm={this.completeComm}
              payComm={this.payComm}/>
          }




            
          </main>
              </div>
              </div>
          </div>
      )
  }
}
export default Dogs;