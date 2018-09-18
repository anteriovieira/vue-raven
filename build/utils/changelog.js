const execa = require('execa')
const cc = require('conventional-changelog')

const gen = module.exports = version => {
  const filestream = require('fs').createWriteStream('CHANGELOG.md')

  cc({
    preset: 'angular',
    pkg: {
      transform (pkg) {
        pkg.version = `v${version}`
        return pkg
      }
    }
  }).pipe(filestream).on('close', async () => {
    delete process.env.PREFIX
    await execa('git', ['add', '-A'], { stdio: 'inherit' })
    await execa('git', ['commit', '-m', `chore(changelog): ${version} change log updated`], { stdio: 'inherit' })
  })
}

const version = require('../../package.json')
gen(version)
