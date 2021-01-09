const { platform } = require('os')
const { spawn } = require('child_process')
const { removeSync } = require('fs-extra')

const isWindows = platform() === 'win32'

removeSync('dist')
spawn(`ttsc${isWindows ? '.cmd' : ''}`, ['--project', 'tsconfig.server.json'])
spawn(`vue-cli-service${isWindows ? '.cmd' : ''}`, ['build'])
