
var fiducia=artifacts.require("Fiducia");
var cantina = artifacts.require("Cantina");

module.exports = function(deployer) {
    deployer.deploy(fiducia,1000000000).then(function(){
          return deployer.deploy(cantina, fiducia.address)
  });
  };
