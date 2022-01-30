import fs from 'node:fs'
import chalk from "chalk"
import { IpfsFileStore } from '../file-stores/ipfs-file-store'
import { FileId, FileStore } from '../file-stores/file-store'
import { SmartContractRefStore } from '../ref-stores/smart-contract-ref-store'
import { RefStore } from '../ref-stores/ref-store'


export async function uploadAction(filePath: string, options: any) {
  try {
    // verify file exists
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`Error: File '${filePath}' does not exist`))
      process.exit(1)
    }

    const ipfsUrl = options?.url ?? process.env.IPFS_URL
    const ipfsFiletore = new IpfsFileStore(ipfsUrl)
    const id = await uploadToFileStore(filePath, ipfsFiletore)
    if (id) {
      const smartContractRefStore = new SmartContractRefStore(
        process.env.RPC_SERVER_ADDRESS as string,
        process.env.WEB3_ACCOUNT as string,
      )
      await saveFileRef(id, smartContractRefStore)
    } else {
      console.error(chalk.red(`Error: Failed to upload file '${filePath}' to IPFS`))
    }
  } catch(err) {
    console.error(chalk.red(err))
    process.exit(1)
  }
}

export async function uploadToFileStore(filePath: string, fileStore: FileStore): Promise<FileId | undefined> {
  try {
    const cid = await fileStore.store(filePath)
    return cid
  } catch(err: any) {
    console.error(chalk.red(err))
    return undefined
  }
}

export async function saveFileRef(fileRef: FileId, refStore: RefStore) {
  try {
    return await refStore.saveRef(fileRef)
  } catch(err) {
    console.error(chalk.red(err))
  }
}
