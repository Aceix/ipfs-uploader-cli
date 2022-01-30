import IPFS from 'ipfs-http-client'

export interface FileStore {

  /**
   * Method to store a file.
   * @param stream readable stream containing file data
   */
  store(stream: string): FileId | Promise<FileId | undefined>,
}

export type FileId = IPFS.CID
