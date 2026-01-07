# CORE About

Static pages for [CORE](https://core.ac.uk). The project is based on React and
Next.js.


## Prerequisites

1.  **Node.js**: [download from nodejs.org][node-download] or check the
    [official installation guidelines][node-package-manager-download] if you
    prefer using a package manager

2.  **NPM**: usually is installed with Node but you can have a look at the
    [installation guide][npm-install]

3.  **NPM_TOKEN**: generate a token with the `package:read` permission at
    your [GitHub Settings][github-token] and place it into your `.bashrc` or
    `.zshrc` as follows:

    ```sh
    export NPM_TOKEN=<your-token-goes-here>
    ```

    The token is needed to enable NPM to download our scoped `@oacore` 
    packages, deployed to the GitHub Registry.


## Getting started

When you pass all [Prerequisites](#prerequisites) you can `cd` into the
project directory and start development as follows:

```sh
npm install
npm run dev
```

## Design vendor update

1. Use Node v.16
2. Run `npm update @oacore/design`

Open [localhost:3000](http://localhost:3000) to see the website.

__Well done! 🎉__


## Project structure

The infrastructure and relations between the front-end modules is displayed
using the following diagram:

![Schema of the CORE front-end infrastructure consisting of 2 library modules
  and many application modules
](https://user-images.githubusercontent.com/8440244/112995708-29e46580-9174-11eb-9acc-cd874cd798c3.png)

There is a _Library Layer_ providing all shared components for the
applications, and an _Application Layer_ which consists of these applications,
consuming shared components.

Specifically, this projects requires the [@oacore/design][design] package 
during the installation stage and depends on [oacore/content][content] 
and our [API][api] at the build stage.

We use [Netlify CMS][netlify-cms] for editing our content. The CMS pushes
changes to some directories at [oacore/content][content].

Also, this projects uses images hosted directly from
[oacore.github.io/content](https://oacore.github.io/content) for simplicity.

## Links for help

* [github-token](https://github.com/settings/tokens)
* [node-download](https://nodejs.org/en/download/)
* [node-package-manager-download](https://nodejs.org/en/download/package-manager/)
* [npm-install](https://www.npmjs.com/get-npm)
* [netlify-cms](https://www.netlifycms.org)

* [design](https://github.com/oacore/design)
* [content](https://github.com/oacore/content)
* [edit content](https://core.ac.uk/edit)
* [api](https://api.core.ac.uk)


## Thanks ❤️

We support Open Access and Open Source. Many open-source and 
non-open-source projects help us to deliver our products in great quality.

We give thanks to:
[
  ![BrowserStack](docs/images/browserstack-logo.svg)
](https://browserstack.com)

