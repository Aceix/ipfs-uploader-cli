import fs from 'node:fs'
import chalk from "chalk"
import { IpfsFileStore } from '../file-stores/ipfs-file-store'
import { FileId } from '../file-stores/file-store'
import { SmartContractRefStore } from '../ref-stores/smart-contract-ref-store'


async function uploadAction(filePath: string, options: any) {
  try {
    // verify file exists
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`Error: File '${filePath}' does not exist`))
      process.exit(1)
    }

    const ipfsUrl = options?.url ?? process.env.IPFS_URL
    const id = await uploadToFileStore(filePath, ipfsUrl)
    if (id) {
      await saveFileRef(id)
    } else {
      console.error(chalk.red(`Error: Failed to upload file '${filePath}' to IPFS`))
    }
  } catch(err) {
    console.error(chalk.red(err))
    process.exit(1)
  }
}

async function uploadToFileStore(filePath: string, url?: string): Promise<FileId | undefined> {
  try {
    const ipfsFiletore = new IpfsFileStore(url)

    const cid = await ipfsFiletore.store(filePath)

    return cid
  } catch(err: any) {
    console.error(chalk.red(err))
    return undefined
  }
}

async function saveFileRef(fileRef: FileId) {
  try {
    const smartContractRefStore = new SmartContractRefStore(
      process.env.RPC_SERVER_ADDRESS as string,
      process.env.WEB3_ACCOUNT as string,
    )

    const id = smartContractRefStore.saveRef(fileRef)
  } catch(err) {
    console.error(chalk.red(err))
  }
}

export { uploadAction }
