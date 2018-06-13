# scuttlebot-release

shrinkwrapped releases of scuttlebot

install an exact known-to-work dependency tree (shrinkwrapped) at any working
scuttlebot@>=9.0.0

`npm install scuttlebot-release@{version} -g`

it's just a script to install a particular version, save a shrinkwrap,
run the tests (after copying dev deps).

## using this script

to cut a new `scuttlebot-release` clone this repo,
then run `./build.sh {scuttlebot-version} {build?}`.
`{build}` is optional. use `build` if you want to cut a release
with the same version of `scuttlebot`, but with a new dependency tree.
If provided, the bulid must start with `-` for example `-1` is a valid option for `build`




## License

MIT

