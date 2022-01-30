#! /usr/bin/env -S node --no-deprecation

import 'dotenv/config'
import { Command } from 'commander'
import { uploadAction } from './commands/upload'


const program = new Command()

program
  .name('ipfs-uploader')
  .description('Basic CLI tool for upload files to IPFS and storing CID in blockchain')
  .version('0.0.1')
  .argument('<filePath>', 'Path to file to upload')
  .action(uploadAction)

program.command('upload')
  .description('Upload a file to IPFS')
  .argument('<filePath>', 'The file to upload')
  .option('--url <url>', "URL/MultiAddr of the IPFS node\nOverrides 'IPFS_URL' env variable")
  .action(uploadAction)

program.parse()
