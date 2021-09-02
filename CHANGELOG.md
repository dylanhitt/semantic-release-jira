## [1.0.1](https://github.com/boxcee/semantic-release-jira-releases/compare/v1.0.0...v1.0.1) (2021-09-02)


### Bug Fixes

* First version ([783d80f](https://github.com/boxcee/semantic-release-jira-releases/commit/783d80f9953e98227dc0cdf5b24755a1b3217596))

# 1.0.0 (2021-09-02)


### Bug Fixes

* error when releaseDescriptionTemplate is undefined ([17dca0c](https://github.com/boxcee/semantic-release-jira-releases/commit/17dca0cd685cb4c91859ff0af2943adb56108e00))
* First version ([25ffcd6](https://github.com/boxcee/semantic-release-jira-releases/commit/25ffcd68e0413d64cdf3f209a4718677415cab5f))
* First version ([f5557ff](https://github.com/boxcee/semantic-release-jira-releases/commit/f5557ff7f571a34c3cedc9c360e34e1a579d72c1))
* First version ([a325b40](https://github.com/boxcee/semantic-release-jira-releases/commit/a325b400d4f4d2f1e2a8416664025b0661345159))
* First version ([55491f6](https://github.com/boxcee/semantic-release-jira-releases/commit/55491f631caed8b5656ddbd27e8ecb01b2cdaf7b))
* First version ([5276152](https://github.com/boxcee/semantic-release-jira-releases/commit/52761521cd5b8ff7f860e20c33b46aa29c563c69))
* First version ([993ea98](https://github.com/boxcee/semantic-release-jira-releases/commit/993ea98b9499c5484ba1637640fe539de177f2c1))
* First version ([dd714cf](https://github.com/boxcee/semantic-release-jira-releases/commit/dd714cf64aad42a939bc1bdfc09b9ae85b4816a1))
* **ci:** Automate npm publish ([5abd275](https://github.com/boxcee/semantic-release-jira-releases/commit/5abd2753f047122d1baaa4199acb97d5c3cfdb06))
* **ci:** make sure we can compile as a test ([05b883d](https://github.com/boxcee/semantic-release-jira-releases/commit/05b883d5e18a804a276f80176709a73a05f20ff3))
* **ci:** make sure we can compile as a test ([542429b](https://github.com/boxcee/semantic-release-jira-releases/commit/542429b40ce3e0dc96678f1ef3bb787472a6d91f))
* **deps:** upgrade jira-connector to 3.1.0 ([3d157d5](https://github.com/boxcee/semantic-release-jira-releases/commit/3d157d587c368fc774e252f4aea9fd400083ad47))
* **security:** Merge pull request [#42](https://github.com/boxcee/semantic-release-jira-releases/issues/42) from UpHabit/dependabot/npm_and_yarn/lodash-4.17.19 ([07a32d9](https://github.com/boxcee/semantic-release-jira-releases/commit/07a32d93b56852e703c62cee5206fa05952bc9bc))
* **version:** Release init version ([b7d5168](https://github.com/boxcee/semantic-release-jira-releases/commit/b7d5168facc624f9808a61e9d0f4ed38687c5778))
* Merge pull request [#20](https://github.com/boxcee/semantic-release-jira-releases/issues/20) from UpHabit/renovate/major-semantic-release-monorepo ([d758907](https://github.com/boxcee/semantic-release-jira-releases/commit/d758907d37bd0e861fd1b10ce3acbd6829006d4e))
* **security:** update all packages with secuirty issues ([1ba6780](https://github.com/boxcee/semantic-release-jira-releases/commit/1ba67803f6c1f51770bd0b8d0f0f1e23d9025e64))
* escaping regex ([e1bea79](https://github.com/boxcee/semantic-release-jira-releases/commit/e1bea7932f3c8ecd6647cadf6413500740137235))
* fixing ticketRegex matching ([7a3957d](https://github.com/boxcee/semantic-release-jira-releases/commit/7a3957d5b14489ee7493f71f10f3e537f367b35e))
* **ci:** remove extra unneeded dependency ([887f522](https://github.com/boxcee/semantic-release-jira-releases/commit/887f52273a13e80f6bdc62b096572aa16b0fe6f7))
* **deps:** add missing tslib dep ([8b59b2c](https://github.com/boxcee/semantic-release-jira-releases/commit/8b59b2c6468c37114a26d12f16f729ccf0e794c0))
* [FIX-123] typescript config ([72159d8](https://github.com/boxcee/semantic-release-jira-releases/commit/72159d8670218409327835f24226e814ea0559f9))


### Features

* [UH-1258] better logging ([85a74e9](https://github.com/boxcee/semantic-release-jira-releases/commit/85a74e937880e4cd5dd05dde47509db164855051))
* [UH-1258] Implement release creation ([c44e1aa](https://github.com/boxcee/semantic-release-jira-releases/commit/c44e1aa0e8bab21f0aff2f00d4667625f8716c7d))
* add config for release description ([cd25e0d](https://github.com/boxcee/semantic-release-jira-releases/commit/cd25e0d74174b4f2eff676cdf7dbb32e2e773f54))
* add option for released and releaseDate for veresion ([879d592](https://github.com/boxcee/semantic-release-jira-releases/commit/879d592eae0f2ff7b321794fe7c1d386b8ce2dff))
* add release notes to JIRA release ([e7ce86b](https://github.com/boxcee/semantic-release-jira-releases/commit/e7ce86b30a68dcb342afe765c5c0600cc418c7e4))
* adding support for regex in tickets ([8cef9b0](https://github.com/boxcee/semantic-release-jira-releases/commit/8cef9b0d81b8e30632c2cf74fceed3d072a50b54))
* adding the ability to pass a regex to filter tickets ([#10](https://github.com/boxcee/semantic-release-jira-releases/issues/10)) ([71b535f](https://github.com/boxcee/semantic-release-jira-releases/commit/71b535fd3ccbaf65a67a3df01d6a22f746fd53c7))
* allow multiple tickets in the same commit message ([aff41a2](https://github.com/boxcee/semantic-release-jira-releases/commit/aff41a2f576e790e0e814c36fda73d1f01efa925))
* bulk update issues and network concurrency limit ([2bebfd4](https://github.com/boxcee/semantic-release-jira-releases/commit/2bebfd40880df43e2be4f15298b21cd7274d12a0))
* **deps:** lodash vunerability ([96addad](https://github.com/boxcee/semantic-release-jira-releases/commit/96addada2d0add21972ed141a76c687089ebce14))
* **deps:** lodash vunerability ([#9](https://github.com/boxcee/semantic-release-jira-releases/issues/9)) ([6d8637b](https://github.com/boxcee/semantic-release-jira-releases/commit/6d8637b1a6013c24767adc7e17531306af7c7c92))
