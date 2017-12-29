#  Release process

1. Make sure you have a clean and up-to-date working directory pointing to master branch
1. Create a new version. Try to follow [Semantic Versioning](https://semver.org/).
    ```bash
    npm version [patch|minor|major]
    ```
1. Publish version to npm. You will need to be logged in. Check [npm adduser](https://docs.npmjs.com/cli/adduser).
    ```bash
    npm publish
    ```
1. Update demo page.
    ```bash
    npm run gh-pages
    ```
