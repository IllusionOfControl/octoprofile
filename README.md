# OctoProfile

A nicer look at your personal GitHub Profile! With charts!

![demo](https://raw.githubusercontent.com/IllusionOfControl/octoprofile/master/static/og.png)

Built with:

- [Next.js](https://nextjs.org/)
- [react-chartjs-2](https://react-chartjs-2.js.org)
- [React Flip Move](https://github.com/joshwcomeau/react-flip-move)
- [Styled Components](https://www.styled-components.com/)

## Getting Started
To get started, clone the repository and install the dependencies:

```shell
git clone https://github.com/username/project.git
cd project
npm install
```

## Building and Exporting
To build the static site, run the following command:

```shell 
GITHUB_TOKEN=<your-token-here> npm run build
```
This will generate a static version of the site in the out directory.

To export the site, run the following command:

```shell
GITHUB_TOKEN=<your-token-here> npm run export
```

This will generate a static version of the site in the out directory 
that can be deployed to a static hosting service.

## Deploying
You can deploy the static site to any static hosting service. One popular option is Vercel.

To deploy to Vercel, create an account and link your GitHub repository. 
Vercel will automatically detect that this is a Next.js project and deploy it using the appropriate settings. 
You can set the **GITHUB_TOKEN** environment variable in the Vercel dashboard.