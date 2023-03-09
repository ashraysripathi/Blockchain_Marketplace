import Web3 from 'web3';
import CantinaBuild from 'contracts/Cantina.json';
let selectedAccount;
let CantinaContract;
let isInitialized = false;
export const init =async()=>{
    let provider=window.ethereum;
    if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	}
  const web3 = new Web3(provider);
  const networkId=await web3.eth.net.getId();
  CantinaContract= new web3.eth.Contract(CantinaBuild.abi,CantinaBuild.networks[networkId].address)
  console.log(CantinaBuild.networks[networkId].address)
  //console.log(CantinaContract.methods.balanceOfSC().call().then((s)=>{console.log(s)}));
  //return CantinaContract.methods.balanceOfSC().call();
  isInitialized = true;
  return selectedAccount;


}

export const testStr =async()=>{
    if (!isInitialized) {
		await init();
	}
    //CantinaContract.methods.balanceOfSC().call().then(result => console.log(result)).catch( err => console.log(err));
    //console.log(CantinaContract.methods.balanceOfSC().call().then((balance) => {return Web3.utils.fromWei(balance);}));

   
    return  CantinaContract.methods.balanceOfSC().call().then((balance) => {
        return Web3.utils.fromWei(balance);
    });

}

export const registerCreator=async()=>{
    if (!isInitialized) {
		await init();
	}
    CantinaContract.methods.registerCreator().send({from:selectedAccount,value:"100"});
}

export const registerCustomer=async()=>{
    if (!isInitialized) {
		await init();
	}
    CantinaContract.methods.registerCustomer().send({from:selectedAccount});
}

export const newListing=async(price)=>{
    if (!isInitialized) {
		await init();
	}
    CantinaContract.methods.createListing(price).send({from:selectedAccount});
}

export const buyProduct=async(id)=>{
    if (!isInitialized) {
		await init();
	}
    CantinaContract.methods.but(id).send({from:selectedAccount,value:"100"});

}