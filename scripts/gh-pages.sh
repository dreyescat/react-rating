#!/usr/bin/env bash

# Remove old dist
rm -rf dist
# Clone local repo to dist and point to gh-pages branch
git clone . dist
cd dist
git checkout gh-pages
# Checkout changes from master
git checkout master -- :/index.html :/lib

# Add dependencies
git add :/node_modules/react/dist
git add :/node_modules/bootstrap/dist
git add :/node_modules/font-awesome/css node_modules/font-awesome/fonts

git commit -m "Release"

git push origin gh-pages
