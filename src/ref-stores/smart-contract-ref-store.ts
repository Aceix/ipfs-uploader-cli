import Web3 from "web3";
import { RefStore } from "./ref-store";
import FILE_STORE_CONTRACT_ARTEFACT from '../assets/contracts/file-store-contract.artefact.json'
import chalk from "chalk";
const Contract = require('@truffle/contract')


export class SmartContractRefStore implements RefStore {
  
  private web3: Web3
  private FileStoreContract: any
  private rpcServerAddress: string
  private account: string

  constructor(rpcServerAddress: string, account: string) {
    this.rpcServerAddress = rpcServerAddress
    this.account = account
    this.web3 = new Web3(rpcServerAddress)
    console.log(chalk(`Connecting to Ethereum (${this.rpcServerAddress})...`))
    const FileStoreContract = Contract(
      FILE_STORE_CONTRACT_ARTEFACT,
    )
    FileStoreContract.setProvider(this.web3.currentProvider)
    this.FileStoreContract = FileStoreContract
  }

  async saveRef(ref: any): Promise<any> {
    try {
      const fileStoreContract = await this.FileStoreContract.deployed()
      console.log(chalk(`Connected to smart contract at: '${fileStoreContract.address}'`))
      console.log(chalk(`Storing CID '${ref}' in smart contract...`))
      const res = await fileStoreContract.saveCid(String(ref), { from: this.account, })
      console.log(chalk.green(`Stored CID '${ref}' in smart contract! Tx hash: '${res.tx}'`))
      return res.tx
    } catch(err) {
      console.error(chalk.red(err))
      return undefined
    }
  }

}
