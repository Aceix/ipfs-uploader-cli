#! /usr/bin/env -S node --no-deprecation

import 'dotenv/config'
import { Command } from 'commander'
import { uploadAction } from './commands/upload'


const program = new Command()

program
  .name('ipfs-uploader')
  .description('\
    Basic CLI tool for upload files to IPFS and storing CID in blockchain\n\
    Ensure the ff env vars are set: \
    WEB3_PROVIDER, WEB3_ACCOUNT, FILE_STORE_SMART_CONTRACT_ADDRESS, IPFS_URL\
  ')
  .version('0.0.1')
  .argument('<filePath>', 'Path to file to upload')
  .action(uploadAction)

program.command('upload')
  .description('Upload a file to IPFS')
  .argument('<filePath>', 'The file to upload')
  .option('--url <url>', "URL/MultiAddr of the IPFS node\nOverrides 'IPFS_URL' env variable")
  .action(uploadAction)

program.parse()
