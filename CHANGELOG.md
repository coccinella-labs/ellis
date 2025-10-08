# 1.0.0 (2025-10-08)

### Bug Fixes

- add check to skip release if version exists on npm ([0f9eb4e](https://github.com/harpertoken/autofix/commit/0f9eb4e237ea05eb266bcc57b4e93a7f9e132efc))
- add from option to postcss config to suppress warning ([1a16c7e](https://github.com/harpertoken/autofix/commit/1a16c7e3c9adb074e65c8096eb8672647af3a4a1))
- add permissions for semantic-release to push ([cf5062b](https://github.com/harpertoken/autofix/commit/cf5062bdf531b21dda4c61a9e00d8daa9d276b21))
- add runtime back to functions ([fd1d631](https://github.com/harpertoken/autofix/commit/fd1d63183b48e638e03d10e89548e6019cadfeb6))
- adjust publishing config for github packages ([94c55d5](https://github.com/harpertoken/autofix/commit/94c55d5542bae607c48b1d68062d794704fb196b))
- build server to api/index.js for vercel serverless ([5037bd0](https://github.com/harpertoken/autofix/commit/5037bd0746eb9319db6d247ea6a808d539258d90))
- change cli package name to avoid scoped package publish ([0b1b2c2](https://github.com/harpertoken/autofix/commit/0b1b2c2a089fa3649f49983c0b1d7b3aec94bf53))
- change runtime to node ([81d5dfd](https://github.com/harpertoken/autofix/commit/81d5dfd8a6a0ddd2ae26ac865412cd07d975bbd2))
- change runtime to nodejs ([5a0585b](https://github.com/harpertoken/autofix/commit/5a0585bafc555c8c82af793b9f5b0c838fc1175a))
- correct yaml indentation for github actions ([e96940d](https://github.com/harpertoken/autofix/commit/e96940d2329e6dc621cea09b5647341a786af663))
- correct yaml indentation for if and run in cli.yml ([3ee709c](https://github.com/harpertoken/autofix/commit/3ee709c7ada500925d346bc81c7799f44dcc0385))
- correct yaml indentation for install dependencies step ([db82389](https://github.com/harpertoken/autofix/commit/db823897bc8e75aac030a65b185fdd7aa8f7069a))
- correct yaml indentation for workflow ([14d9c7e](https://github.com/harpertoken/autofix/commit/14d9c7e968bd249c3c88a58c164825cb5a3ed0e7))
- correct yaml indentation in cli.yml ([b23d0bc](https://github.com/harpertoken/autofix/commit/b23d0bcfbfba256e082a209574fc526b98cc423d))
- correct yaml indentation in cli.yml ([a373cc2](https://github.com/harpertoken/autofix/commit/a373cc2e1cd1c3f58d337c03cef78d8c1c429991))
- explicitly set registries in plugins ([7578a15](https://github.com/harpertoken/autofix/commit/7578a1553e313d5a6b7fa118a9ec480d1be4ccf7))
- include package.json in release commit assets ([d0fa3e8](https://github.com/harpertoken/autofix/commit/d0fa3e8038d29a40f33d50505615f7773522f80a))
- publish cli to github packages instead of npm ([06d2eb3](https://github.com/harpertoken/autofix/commit/06d2eb342cbbe03cfbeec62ce8184b45dc81b68e))
- publish to github packages before npm to avoid missing ([959d682](https://github.com/harpertoken/autofix/commit/959d682e4dc33c21b51e785b69c7f9a25c009bb7))
- remove functions from vercel.json ([f658203](https://github.com/harpertoken/autofix/commit/f6582034656e67876391a7b46e315288058abc39))
- remove quotes and fix indentation in with block ([ccaae40](https://github.com/harpertoken/autofix/commit/ccaae4079913f94552955819a9c0c8d4d0d5e726))
- remove runtime from functions to let vercel detect ([82596c2](https://github.com/harpertoken/autofix/commit/82596c2a7acf8c253e97b9b67060da661462b180))
- remove version check step to fix workflow trigger ([cb7fe0f](https://github.com/harpertoken/autofix/commit/cb7fe0f89ab5f802515608176e2939b963db8021))
- rename package to @harpertoken/autofix-cli to avoid con ([b1954da](https://github.com/harpertoken/autofix/commit/b1954dae156e9acbd77c5b66c0db1fbf53deeadd))
- skip release on automated commits to prevent duplicate ([5f73131](https://github.com/harpertoken/autofix/commit/5f7313158c9fb232a22148c7442437863d5b67ca))
- specify @vercel/node@18 runtime ([a9759e4](https://github.com/harpertoken/autofix/commit/a9759e4d86caf924eb9e6418b0c2648a4769b4fb))
- specify npm registry for public publish ([d87ff4f](https://github.com/harpertoken/autofix/commit/d87ff4fff1c36855856a3d5f6013640844a1af72))
- test dual publishing with updated tokens ([6bcf800](https://github.com/harpertoken/autofix/commit/6bcf800f0b26fe689512f38a570940561ebcbc48))
- test release process ([446859d](https://github.com/harpertoken/autofix/commit/446859dd105817a3b4da0fe5416a9aa3136d4b1a))
- update readme with release info ([f0fdff9](https://github.com/harpertoken/autofix/commit/f0fdff950af277b079f8988f9294f00c4ab4969f))
- update vercel runtime to @vercel/node ([12ab60d](https://github.com/harpertoken/autofix/commit/12ab60d8974e02188dd914c9f8710457f2f76ea6))
- use correct tokens for each registry ([3999ad3](https://github.com/harpertoken/autofix/commit/3999ad3f611501b86937526a86f724aca669439c))
- use github_token for github packages publish ([72ba925](https://github.com/harpertoken/autofix/commit/72ba925b3781a818acb80adb27d9f4d15611e3d0))
- use github_token in release workflow ([422fec2](https://github.com/harpertoken/autofix/commit/422fec2414b7f8dd2d337f6dc168d7c61d70af74))
- use npm_token for both publishes ([ba1a24c](https://github.com/harpertoken/autofix/commit/ba1a24c9bfbe1dadaa9c5c8ae6820078ccacb080))

### Features

- add autofix setup script and update readme ([a6ce1b4](https://github.com/harpertoken/autofix/commit/a6ce1b413dbd494d70a4bb7970a2132cf106f06c))
- add optional cli install step to readme ([0223cf4](https://github.com/harpertoken/autofix/commit/0223cf40d1c7b01d8a11dd06a2c4f89dda5fd111))
- add publishconfig for public npm access ([ebb012a](https://github.com/harpertoken/autofix/commit/ebb012a5ec35747c1feda9747aab801b745fc01b))
- add test release trigger ([305426b](https://github.com/harpertoken/autofix/commit/305426b818b740a2337677b833f036f561718e40))
- add version check to prevent duplicate publishes ([66c6499](https://github.com/harpertoken/autofix/commit/66c64995f36d1fafc0b737dd10769493af936eee))
- minimize api status indicator and add inspiration cred ([bcb118a](https://github.com/harpertoken/autofix/commit/bcb118a6e8792a58fa6b7aea3285b9e18a890e5d))
- minimize shortcuts indicator and add platform detectio ([12c8fdb](https://github.com/harpertoken/autofix/commit/12c8fdb0f4e04cd8ee11399ecf544836f59e97f2))
- publish cli to both npm and github packages ([5bc3cd6](https://github.com/harpertoken/autofix/commit/5bc3cd6df0fd60d44125bf7c4914dfc6c659ec75))

# 1.0.0 (2025-10-08)

### Bug Fixes

- add check to skip release if version exists on npm ([0f9eb4e](https://github.com/harpertoken/autofix/commit/0f9eb4e237ea05eb266bcc57b4e93a7f9e132efc))
- add from option to postcss config to suppress warning ([1a16c7e](https://github.com/harpertoken/autofix/commit/1a16c7e3c9adb074e65c8096eb8672647af3a4a1))
- add permissions for semantic-release to push ([cf5062b](https://github.com/harpertoken/autofix/commit/cf5062bdf531b21dda4c61a9e00d8daa9d276b21))
- add runtime back to functions ([fd1d631](https://github.com/harpertoken/autofix/commit/fd1d63183b48e638e03d10e89548e6019cadfeb6))
- adjust publishing config for github packages ([94c55d5](https://github.com/harpertoken/autofix/commit/94c55d5542bae607c48b1d68062d794704fb196b))
- build server to api/index.js for vercel serverless ([5037bd0](https://github.com/harpertoken/autofix/commit/5037bd0746eb9319db6d247ea6a808d539258d90))
- change cli package name to avoid scoped package publish ([0b1b2c2](https://github.com/harpertoken/autofix/commit/0b1b2c2a089fa3649f49983c0b1d7b3aec94bf53))
- change runtime to node ([81d5dfd](https://github.com/harpertoken/autofix/commit/81d5dfd8a6a0ddd2ae26ac865412cd07d975bbd2))
- change runtime to nodejs ([5a0585b](https://github.com/harpertoken/autofix/commit/5a0585bafc555c8c82af793b9f5b0c838fc1175a))
- correct yaml indentation for github actions ([e96940d](https://github.com/harpertoken/autofix/commit/e96940d2329e6dc621cea09b5647341a786af663))
- correct yaml indentation for if and run in cli.yml ([3ee709c](https://github.com/harpertoken/autofix/commit/3ee709c7ada500925d346bc81c7799f44dcc0385))
- correct yaml indentation for install dependencies step ([db82389](https://github.com/harpertoken/autofix/commit/db823897bc8e75aac030a65b185fdd7aa8f7069a))
- correct yaml indentation for workflow ([14d9c7e](https://github.com/harpertoken/autofix/commit/14d9c7e968bd249c3c88a58c164825cb5a3ed0e7))
- correct yaml indentation in cli.yml ([b23d0bc](https://github.com/harpertoken/autofix/commit/b23d0bcfbfba256e082a209574fc526b98cc423d))
- correct yaml indentation in cli.yml ([a373cc2](https://github.com/harpertoken/autofix/commit/a373cc2e1cd1c3f58d337c03cef78d8c1c429991))
- explicitly set registries in plugins ([7578a15](https://github.com/harpertoken/autofix/commit/7578a1553e313d5a6b7fa118a9ec480d1be4ccf7))
- include package.json in release commit assets ([d0fa3e8](https://github.com/harpertoken/autofix/commit/d0fa3e8038d29a40f33d50505615f7773522f80a))
- publish cli to github packages instead of npm ([06d2eb3](https://github.com/harpertoken/autofix/commit/06d2eb342cbbe03cfbeec62ce8184b45dc81b68e))
- publish to github packages before npm to avoid missing ([959d682](https://github.com/harpertoken/autofix/commit/959d682e4dc33c21b51e785b69c7f9a25c009bb7))
- remove functions from vercel.json ([f658203](https://github.com/harpertoken/autofix/commit/f6582034656e67876391a7b46e315288058abc39))
- remove quotes and fix indentation in with block ([ccaae40](https://github.com/harpertoken/autofix/commit/ccaae4079913f94552955819a9c0c8d4d0d5e726))
- remove runtime from functions to let vercel detect ([82596c2](https://github.com/harpertoken/autofix/commit/82596c2a7acf8c253e97b9b67060da661462b180))
- remove version check step to fix workflow trigger ([cb7fe0f](https://github.com/harpertoken/autofix/commit/cb7fe0f89ab5f802515608176e2939b963db8021))
- rename package to @harpertoken/autofix-cli to avoid con ([b1954da](https://github.com/harpertoken/autofix/commit/b1954dae156e9acbd77c5b66c0db1fbf53deeadd))
- skip release on automated commits to prevent duplicate ([5f73131](https://github.com/harpertoken/autofix/commit/5f7313158c9fb232a22148c7442437863d5b67ca))
- specify @vercel/node@18 runtime ([a9759e4](https://github.com/harpertoken/autofix/commit/a9759e4d86caf924eb9e6418b0c2648a4769b4fb))
- specify npm registry for public publish ([d87ff4f](https://github.com/harpertoken/autofix/commit/d87ff4fff1c36855856a3d5f6013640844a1af72))
- test dual publishing with updated tokens ([6bcf800](https://github.com/harpertoken/autofix/commit/6bcf800f0b26fe689512f38a570940561ebcbc48))
- test release process ([446859d](https://github.com/harpertoken/autofix/commit/446859dd105817a3b4da0fe5416a9aa3136d4b1a))
- update readme with release info ([f0fdff9](https://github.com/harpertoken/autofix/commit/f0fdff950af277b079f8988f9294f00c4ab4969f))
- update vercel runtime to @vercel/node ([12ab60d](https://github.com/harpertoken/autofix/commit/12ab60d8974e02188dd914c9f8710457f2f76ea6))
- use correct tokens for each registry ([3999ad3](https://github.com/harpertoken/autofix/commit/3999ad3f611501b86937526a86f724aca669439c))
- use github_token for github packages publish ([72ba925](https://github.com/harpertoken/autofix/commit/72ba925b3781a818acb80adb27d9f4d15611e3d0))
- use github_token in release workflow ([422fec2](https://github.com/harpertoken/autofix/commit/422fec2414b7f8dd2d337f6dc168d7c61d70af74))
- use npm_token for both publishes ([ba1a24c](https://github.com/harpertoken/autofix/commit/ba1a24c9bfbe1dadaa9c5c8ae6820078ccacb080))

### Features

- add autofix setup script and update readme ([a6ce1b4](https://github.com/harpertoken/autofix/commit/a6ce1b413dbd494d70a4bb7970a2132cf106f06c))
- add optional cli install step to readme ([0223cf4](https://github.com/harpertoken/autofix/commit/0223cf40d1c7b01d8a11dd06a2c4f89dda5fd111))
- add publishconfig for public npm access ([ebb012a](https://github.com/harpertoken/autofix/commit/ebb012a5ec35747c1feda9747aab801b745fc01b))
- add test release trigger ([305426b](https://github.com/harpertoken/autofix/commit/305426b818b740a2337677b833f036f561718e40))
- add version check to prevent duplicate publishes ([66c6499](https://github.com/harpertoken/autofix/commit/66c64995f36d1fafc0b737dd10769493af936eee))
- minimize api status indicator and add inspiration cred ([bcb118a](https://github.com/harpertoken/autofix/commit/bcb118a6e8792a58fa6b7aea3285b9e18a890e5d))
- minimize shortcuts indicator and add platform detectio ([12c8fdb](https://github.com/harpertoken/autofix/commit/12c8fdb0f4e04cd8ee11399ecf544836f59e97f2))
- publish cli to both npm and github packages ([5bc3cd6](https://github.com/harpertoken/autofix/commit/5bc3cd6df0fd60d44125bf7c4914dfc6c659ec75))

# [1.6.0](https://github.com/harpertoken/autofix/compare/v1.5.0...v1.6.0) (2025-10-03)

### Features

- add optional CLI install step to README ([85f9a60](https://github.com/harpertoken/autofix/commit/85f9a60b1ac3d81838fe62ce38c277d26eddceae))

# [1.6.0](https://github.com/harpertoken/autofix/compare/v1.5.0...v1.6.0) (2025-10-03)

### Features

- add optional CLI install step to README ([85f9a60](https://github.com/harpertoken/autofix/commit/85f9a60b1ac3d81838fe62ce38c277d26eddceae))

# [1.5.0](https://github.com/harpertoken/autofix/compare/v1.4.3...v1.5.0) (2025-10-03)

### Features

- add autofix setup script and update README ([7d2dd5e](https://github.com/harpertoken/autofix/commit/7d2dd5e0eaacc8a2c475ef7650346521d2ca3ba7))

# [1.5.0](https://github.com/harpertoken/autofix/compare/v1.4.3...v1.5.0) (2025-10-03)

### Features

- add autofix setup script and update README ([7d2dd5e](https://github.com/harpertoken/autofix/commit/7d2dd5e0eaacc8a2c475ef7650346521d2ca3ba7))

## [1.4.3](https://github.com/harpertoken/autofix/compare/v1.4.2...v1.4.3) (2025-10-03)

### Bug Fixes

- explicitly set registries in plugins ([5296ada](https://github.com/harpertoken/autofix/commit/5296ada7764432a7d8cfe0337d52edeaad6342ec))

## [1.4.3](https://github.com/harpertoken/autofix/compare/v1.4.2...v1.4.3) (2025-10-03)

### Bug Fixes

- explicitly set registries in plugins ([5296ada](https://github.com/harpertoken/autofix/commit/5296ada7764432a7d8cfe0337d52edeaad6342ec))

## [1.4.2](https://github.com/harpertoken/autofix/compare/v1.4.1...v1.4.2) (2025-10-03)

### Bug Fixes

- specify npm registry for public publish ([dc215d0](https://github.com/harpertoken/autofix/commit/dc215d0c7277b9541ce14c6794c6dcce76848b99))

## [1.4.2](https://github.com/harpertoken/autofix/compare/v1.4.1...v1.4.2) (2025-10-03)

### Bug Fixes

- specify npm registry for public publish ([dc215d0](https://github.com/harpertoken/autofix/commit/dc215d0c7277b9541ce14c6794c6dcce76848b99))

## [1.4.1](https://github.com/harpertoken/autofix/compare/v1.4.0...v1.4.1) (2025-10-03)

### Bug Fixes

- adjust publishing config for GitHub Packages ([0049213](https://github.com/harpertoken/autofix/commit/004921392099f979653179fd3d7cffa3b0061270))
- update README with release info ([d4342e1](https://github.com/harpertoken/autofix/commit/d4342e118430755e1904d92c31f7c5ce3f5d7684))

## [1.4.1](https://github.com/harpertoken/autofix/compare/v1.4.0...v1.4.1) (2025-10-03)

### Bug Fixes

- adjust publishing config for GitHub Packages ([0049213](https://github.com/harpertoken/autofix/commit/004921392099f979653179fd3d7cffa3b0061270))
- update README with release info ([d4342e1](https://github.com/harpertoken/autofix/commit/d4342e118430755e1904d92c31f7c5ce3f5d7684))

# [1.4.0](https://github.com/harpertoken/autofix/compare/v1.3.6...v1.4.0) (2025-10-03)

### Bug Fixes

- add check to skip release if version exists on npm ([76d4fad](https://github.com/harpertoken/autofix/commit/76d4fadbffc1bdc9deda4a43f9c3283a5d3b0e52))
- correct YAML indentation for workflow ([c211467](https://github.com/harpertoken/autofix/commit/c2114676762c1a40c64e580470eaa553fa297260))
- remove version check step to fix workflow trigger ([7a47f89](https://github.com/harpertoken/autofix/commit/7a47f89dd9169fd5400cb7c48fda57e502cbdca6))

### Features

- add version check to prevent duplicate publishes ([5420b4a](https://github.com/harpertoken/autofix/commit/5420b4a3167172ffe0c0df8cccdd1558ce858e36))

# [1.4.0](https://github.com/harpertoken/autofix/compare/v1.3.6...v1.4.0) (2025-10-03)

### Bug Fixes

- add check to skip release if version exists on npm ([76d4fad](https://github.com/harpertoken/autofix/commit/76d4fadbffc1bdc9deda4a43f9c3283a5d3b0e52))
- correct YAML indentation for workflow ([c211467](https://github.com/harpertoken/autofix/commit/c2114676762c1a40c64e580470eaa553fa297260))
- remove version check step to fix workflow trigger ([7a47f89](https://github.com/harpertoken/autofix/commit/7a47f89dd9169fd5400cb7c48fda57e502cbdca6))

### Features

- add version check to prevent duplicate publishes ([5420b4a](https://github.com/harpertoken/autofix/commit/5420b4a3167172ffe0c0df8cccdd1558ce858e36))

## [1.3.6](https://github.com/harpertoken/autofix/compare/v1.3.5...v1.3.6) (2025-10-03)

### Bug Fixes

- test dual publishing with updated tokens ([4a2f550](https://github.com/harpertoken/autofix/commit/4a2f550a77a4b7e972dfee115c51eac4c15d3ab4))

## [1.3.6](https://github.com/harpertoken/autofix/compare/v1.3.5...v1.3.6) (2025-10-03)

### Bug Fixes

- test dual publishing with updated tokens ([4a2f550](https://github.com/harpertoken/autofix/commit/4a2f550a77a4b7e972dfee115c51eac4c15d3ab4))

## [1.3.5](https://github.com/harpertoken/autofix/compare/v1.3.4...v1.3.5) (2025-10-03)

### Bug Fixes

- test release process ([5337002](https://github.com/harpertoken/autofix/commit/5337002dd476de7e0d555de63364518e8e605759))
- use correct tokens for each registry ([b61f1b6](https://github.com/harpertoken/autofix/commit/b61f1b6b8c9366f54bd43ae726b4d2e6a1819171))

## [1.3.5](https://github.com/harpertoken/autofix/compare/v1.3.4...v1.3.5) (2025-10-03)

### Bug Fixes

- test release process ([5337002](https://github.com/harpertoken/autofix/commit/5337002dd476de7e0d555de63364518e8e605759))
- use correct tokens for each registry ([b61f1b6](https://github.com/harpertoken/autofix/commit/b61f1b6b8c9366f54bd43ae726b4d2e6a1819171))

## [1.3.4](https://github.com/harpertoken/autofix/compare/v1.3.3...v1.3.4) (2025-10-03)

### Bug Fixes

- use NPM_TOKEN for both publishes ([4a26553](https://github.com/harpertoken/autofix/commit/4a26553445d25892f26143ba20a6181505669f06))

## [1.3.4](https://github.com/harpertoken/autofix/compare/v1.3.3...v1.3.4) (2025-10-03)

### Bug Fixes

- use NPM_TOKEN for both publishes ([4a26553](https://github.com/harpertoken/autofix/commit/4a26553445d25892f26143ba20a6181505669f06))

## [1.3.3](https://github.com/harpertoken/autofix/compare/v1.3.2...v1.3.3) (2025-10-03)

### Bug Fixes

- use GITHUB_TOKEN for GitHub Packages publish ([3847199](https://github.com/harpertoken/autofix/commit/38471999782e41a20e8eb7deadc8300ebd287b74))

## [1.3.3](https://github.com/harpertoken/autofix/compare/v1.3.2...v1.3.3) (2025-10-03)

### Bug Fixes

- use GITHUB_TOKEN for GitHub Packages publish ([3847199](https://github.com/harpertoken/autofix/commit/38471999782e41a20e8eb7deadc8300ebd287b74))

## [1.3.2](https://github.com/harpertoken/autofix/compare/v1.3.1...v1.3.2) (2025-10-03)

### Bug Fixes

- add from option to PostCSS config to suppress warning ([04e3b98](https://github.com/harpertoken/autofix/commit/04e3b986928df3cb1d5861e37ced94e3f724268e))
- include package.json in release commit assets ([a5f6706](https://github.com/harpertoken/autofix/commit/a5f67068b811a6740413abde0a1c42bf95975863))
- publish to GitHub Packages before npm to avoid missing stage ([9f2d269](https://github.com/harpertoken/autofix/commit/9f2d269da7f0fbd4b5c14142e325b6b8c89f574e))

## [1.3.2](https://github.com/harpertoken/autofix/compare/v1.3.1...v1.3.2) (2025-10-03)

### Bug Fixes

- add from option to PostCSS config to suppress warning ([04e3b98](https://github.com/harpertoken/autofix/commit/04e3b986928df3cb1d5861e37ced94e3f724268e))
- include package.json in release commit assets ([a5f6706](https://github.com/harpertoken/autofix/commit/a5f67068b811a6740413abde0a1c42bf95975863))
- publish to GitHub Packages before npm to avoid missing stage ([9f2d269](https://github.com/harpertoken/autofix/commit/9f2d269da7f0fbd4b5c14142e325b6b8c89f574e))

## [1.3.1](https://github.com/harpertoken/autofix/compare/v1.3.0...v1.3.1) (2025-10-03)

### Bug Fixes

- skip release on automated commits to prevent duplicate publishes ([1ead72c](https://github.com/harpertoken/autofix/commit/1ead72c5627cb3d490b709e70259820062e968b8))

## [1.3.1](https://github.com/harpertoken/autofix/compare/v1.3.0...v1.3.1) (2025-10-03)

### Bug Fixes

- skip release on automated commits to prevent duplicate publishes ([1ead72c](https://github.com/harpertoken/autofix/commit/1ead72c5627cb3d490b709e70259820062e968b8))

# [1.3.0](https://github.com/harpertoken/autofix/compare/v1.2.1...v1.3.0) (2025-10-02)

### Bug Fixes

- publish CLI to GitHub Packages instead of npm ([5c74da4](https://github.com/harpertoken/autofix/commit/5c74da46477aca298357a282dfc96c5f456eb3b1))

### Features

- add publishConfig for public npm access ([6a2bf01](https://github.com/harpertoken/autofix/commit/6a2bf0191182b234ea7af4842bfdc34820ed2507))
- publish CLI to both npm and GitHub Packages ([02f1a45](https://github.com/harpertoken/autofix/commit/02f1a4501d65b253c5938140237211af71b4cc94))

# [1.3.0](https://github.com/harpertoken/autofix/compare/v1.2.1...v1.3.0) (2025-10-02)

### Bug Fixes

- publish CLI to GitHub Packages instead of npm ([5c74da4](https://github.com/harpertoken/autofix/commit/5c74da46477aca298357a282dfc96c5f456eb3b1))

### Features

- add publishConfig for public npm access ([6a2bf01](https://github.com/harpertoken/autofix/commit/6a2bf0191182b234ea7af4842bfdc34820ed2507))
- publish CLI to both npm and GitHub Packages ([02f1a45](https://github.com/harpertoken/autofix/commit/02f1a4501d65b253c5938140237211af71b4cc94))

## [1.2.1](https://github.com/harpertoken/autofix/compare/v1.2.0...v1.2.1) (2025-10-02)

### Bug Fixes

- change CLI package name to avoid scoped package publishing issue ([7fb0dce](https://github.com/harpertoken/autofix/commit/7fb0dce03e1d7606e5b6a50f0e476e4fa1da0c69))

## [1.2.1](https://github.com/harpertoken/autofix/compare/v1.2.0...v1.2.1) (2025-10-02)

### Bug Fixes

- change CLI package name to avoid scoped package publishing issue ([7fb0dce](https://github.com/harpertoken/autofix/commit/7fb0dce03e1d7606e5b6a50f0e476e4fa1da0c69))

# [1.2.0](https://github.com/harpertoken/autofix/compare/v1.1.0...v1.2.0) (2025-10-02)

### Features

- minimize shortcuts indicator and add platform detection ([5f0ecd7](https://github.com/harpertoken/autofix/commit/5f0ecd7f5f96c177a16f1066b8d1198c054d3914))

# [1.2.0](https://github.com/harpertoken/autofix/compare/v1.1.0...v1.2.0) (2025-10-02)

### Features

- minimize shortcuts indicator and add platform detection ([5f0ecd7](https://github.com/harpertoken/autofix/commit/5f0ecd7f5f96c177a16f1066b8d1198c054d3914))

# [1.1.0](https://github.com/harpertoken/autofix/compare/v1.0.2...v1.1.0) (2025-10-02)

### Features

- minimize API status indicator and add inspiration credit ([1573f91](https://github.com/harpertoken/autofix/commit/1573f9150eea2967e01d3072007be4439e6465a5))

# [1.1.0](https://github.com/harpertoken/autofix/compare/v1.0.2...v1.1.0) (2025-10-02)

### Features

- minimize API status indicator and add inspiration credit ([1573f91](https://github.com/harpertoken/autofix/commit/1573f9150eea2967e01d3072007be4439e6465a5))

## [1.0.2](https://github.com/harpertoken/autofix/compare/v1.0.1...v1.0.2) (2025-10-02)

### Bug Fixes

- rename package to @harpertoken/autofix-cli to avoid conflict ([084c3b8](https://github.com/harpertoken/autofix/commit/084c3b8207342b5a50f5a43fb9c493accfd3e45c))

## [1.0.2](https://github.com/harpertoken/autofix/compare/v1.0.1...v1.0.2) (2025-10-02)

### Bug Fixes

- rename package to @harpertoken/autofix-cli to avoid conflict ([084c3b8](https://github.com/harpertoken/autofix/commit/084c3b8207342b5a50f5a43fb9c493accfd3e45c))

## [1.0.1](https://github.com/harpertoken/autofix/compare/v1.0.0...v1.0.1) (2025-10-02)

### Reverts

- Revert "Simplify API key test to avoid quota issues" ([ee0c851](https://github.com/harpertoken/autofix/commit/ee0c851edb89c37dac019e107c907100f15483d7))

## [1.0.1](https://github.com/harpertoken/autofix/compare/v1.0.0...v1.0.1) (2025-10-02)

### Reverts

- Revert "Simplify API key test to avoid quota issues" ([ee0c851](https://github.com/harpertoken/autofix/commit/ee0c851edb89c37dac019e107c907100f15483d7))

# 1.0.0 (2025-10-02)

### Bug Fixes

- add runtime back to functions ([f48fbc4](https://github.com/harpertoken/autofix/commit/f48fbc49be88e0cfcb7e70dd4e62a51618fd5947))
- build server to api/index.js for Vercel serverless ([69b045e](https://github.com/harpertoken/autofix/commit/69b045ee372b4090d5e381fe83c300b52a1cb45a))
- change runtime to node ([cd660bc](https://github.com/harpertoken/autofix/commit/cd660bc396dead57960ac8a5cef709fce3414c83))
- change runtime to nodejs ([0fdfa9b](https://github.com/harpertoken/autofix/commit/0fdfa9b88677bae3839096d74ea830ddf36a9b16))
- remove functions from vercel.json ([12e38ee](https://github.com/harpertoken/autofix/commit/12e38eef4f18b408ae8dd2276ffd20dc470f0088))
- remove runtime from functions to let Vercel detect ([ed8ad98](https://github.com/harpertoken/autofix/commit/ed8ad98ad64e387c8a3b2dff0eca7adf604244b3))
- specify @vercel/node@18 runtime ([977a63a](https://github.com/harpertoken/autofix/commit/977a63ada9e2cc263c776dc39ae12ecfd627a640))
- update vercel runtime to @vercel/node ([6f525bc](https://github.com/harpertoken/autofix/commit/6f525bcba5bce63f5bcfd8cef363d7d6ea64115a))

# 1.0.0 (2025-10-02)

### Bug Fixes

- add runtime back to functions ([f48fbc4](https://github.com/harpertoken/autofix/commit/f48fbc49be88e0cfcb7e70dd4e62a51618fd5947))
- build server to api/index.js for Vercel serverless ([69b045e](https://github.com/harpertoken/autofix/commit/69b045ee372b4090d5e381fe83c300b52a1cb45a))
- change runtime to node ([cd660bc](https://github.com/harpertoken/autofix/commit/cd660bc396dead57960ac8a5cef709fce3414c83))
- change runtime to nodejs ([0fdfa9b](https://github.com/harpertoken/autofix/commit/0fdfa9b88677bae3839096d74ea830ddf36a9b16))
- remove functions from vercel.json ([12e38ee](https://github.com/harpertoken/autofix/commit/12e38eef4f18b408ae8dd2276ffd20dc470f0088))
- remove runtime from functions to let Vercel detect ([ed8ad98](https://github.com/harpertoken/autofix/commit/ed8ad98ad64e387c8a3b2dff0eca7adf604244b3))
- specify @vercel/node@18 runtime ([977a63a](https://github.com/harpertoken/autofix/commit/977a63ada9e2cc263c776dc39ae12ecfd627a640))
- update vercel runtime to @vercel/node ([6f525bc](https://github.com/harpertoken/autofix/commit/6f525bcba5bce63f5bcfd8cef363d7d6ea64115a))

# Changelog

## 1.0.0

- Initial release
- AI text completion editor
- CLI, web client, server
