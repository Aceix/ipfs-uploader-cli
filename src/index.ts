#! /usr/bin/env node

import { program } from 'commander';
import { uploadAction } from './commands/upload.mjs';

program
  .command('upload')
  .description('Upload a file to IPFS')
  .argument('<file>', 'The file to upload')
  .action(uploadAction);

// TODO: add default command as upload

program.parse()
