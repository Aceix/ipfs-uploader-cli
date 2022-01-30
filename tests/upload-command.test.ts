import { saveFileRef, uploadAction, uploadToFileStore } from '../src/commands/upload'
import { FileStore } from '../src/file-stores/file-store'
import { IpfsFileStore } from '../src/file-stores/ipfs-file-store'
import { RefStore } from '../src/ref-stores/ref-store'
import { SmartContractRefStore } from '../src/ref-stores/smart-contract-ref-store'


// mocks
const mockIpfsStoreFn = jest.fn().mockImplementation(() => 'mock-file-id')
const mockSmartContractSaveRefFn = jest.fn().mockImplementation(() => 'mock-ref-id')

jest.mock('../src/file-stores/ipfs-file-store', () => {
  return {
    IpfsFileStore: jest.fn().mockImplementation(() => ({
      store: mockIpfsStoreFn,
    }))
  }
})

jest.mock('../src/ref-stores/smart-contract-ref-store', () => {
  return {
    SmartContractRefStore: jest.fn().mockImplementation(() => ({
      saveRef: mockSmartContractSaveRefFn,
    }))
  }
})

class MockFileStore implements FileStore {
  async store(_: any): Promise<any> {
    return 'mock-file-id'
  }
}

class MockRefStore implements RefStore {
  async saveRef(_: any): Promise<any> {
    return 'mock-ref-id'
  }
}


describe('uploadToFileStore', () => {
  it('should upload a file to and return the reference ID', async () => {
    const fileStore = new MockFileStore()
    const filePath = './test/fixtures/test.txt'
    const id = await uploadToFileStore(filePath, fileStore)
    expect(id).toEqual('mock-file-id')
  })
})

describe('saveFileRef', () => {
  it('should save the reference ID', async () => {
    const refStore = new MockRefStore()
    const fileRef = 'mock-ref-id'
    const id = await saveFileRef(fileRef, refStore)
    expect(id).toEqual(fileRef)
  })
})

describe('upload command', () => {
  it('should upload a file to IPFS and save the reference ID', async () => {
    const filePath = './tests/fixtures/mock-test-file.txt'
    await uploadAction(filePath, {})
    expect(IpfsFileStore).toHaveBeenCalledTimes(1)
    // .store method should be called to return id
    expect(mockIpfsStoreFn).toHaveBeenCalledTimes(1)
    expect(SmartContractRefStore).toHaveBeenCalledTimes(1)
    // .saveRef method should be called
    expect(mockSmartContractSaveRefFn).toHaveBeenCalledTimes(1)
  })
})
