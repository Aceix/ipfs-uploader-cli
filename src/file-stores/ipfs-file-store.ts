import { FileStore } from "./file-store"
import * as IPFS from 'ipfs-http-client'
import { IPFSHTTPClient, multiaddr } from 'ipfs-http-client'
import chalk from "chalk"
import fs from 'node:fs'


export class IpfsFileStore implements FileStore {

  private instance: IPFSHTTPClient
  
  constructor(url?: URL | string | multiaddr) {  
    console.log(chalk(`Connecting to IPFS via ${url}...`))
    this.instance = IPFS.create({ url, })
  }

  async store(filePath: string) {
    try {
      console.log(chalk(`Uploading '${filePath}' to IPFS...`))
      const cid = (await this.instance.add(fs.createReadStream(filePath))).cid
      console.log(chalk.green(`Uploaded '${filePath}' to IPFS! CID: '${cid}'`))
      return cid
    } catch(err: any) {
      console.error(chalk.red(err))
      return undefined
    }
  }

}
