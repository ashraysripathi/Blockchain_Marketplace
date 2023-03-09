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
import FiduciaBuild from 'contracts/Fiducia.json';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



class MP extends Component{
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
          //console.log(tokenNettwork)
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
            
            console.log(marketplace)
            const contractAddress=marketplace._address
            this.setState({contractAddress})
            console.log(contractAddress)

            this.setState({ marketplace })
            const productCount = await marketplace.methods.nrProducts().call()
            this.setState({ productCount })

            for (var i = 0; i < productCount; i++) {
                const product = await marketplace.methods.prodDetails(i).call()
            
                this.setState({
                  products: [...this.state.products, product]
                })
              }
              this.setState({ loading: false}) 
      
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
            loading:true,
            balance:0,
            'contractAddress':''
          }
          this.createProduct=this.createProduct.bind(this)
          this.regCustomer=this.regCustomer.bind(this)
          this.regCreator=this.regCreator.bind(this)
          this.buyProduct=this.buyProduct.bind(this)
          this.airDrop=this.airDrop.bind(this)
      
      }
      airDrop(aa){
        console.log(aa)
        console.log(this.state.balance)
        this.state.tokencontract.methods.transfer(aa,500).send({from:this.state.account})
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
        this.state.tokencontract.methods.approve(this.state.contractAddress,price).send({from:this.state.account})
        this.state.marketplace.methods.buy(id).send({from:this.state.account,value:price}).once('reciept',(reciept)=>{
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
                
             <Support 
                products={this.state.products}
                regCreator={this.regCreator}
                regCustomer={this.regCustomer}
                createProduct={this.createProduct}
                buyProduct={this.buyProduct}
                airDrop={this.airDrop}/>
              
            </main>
                </div>
                </div>
            </div>
        )
    }
}
export default MP;