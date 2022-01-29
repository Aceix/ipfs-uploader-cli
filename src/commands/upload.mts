import chalk from 'chalk'

export function uploadAction(filePath: string[]) {
  console.log(chalk('Uploading file(s) to IPFS...'))
  console.log(chalk.yellow(filePath))
}
