const FileStore = artifacts.require("FileStore");

module.exports = function(deployer) {
  deployer.deploy(FileStore);
};
