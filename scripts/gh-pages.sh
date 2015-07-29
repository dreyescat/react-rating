#!/usr/bin/env bash

# Clone local repo to dist and point to gh-pages branch
# http://stackoverflow.com/questions/1911109/clone-a-specific-git-branch
# Clone gh-pages preventing fetching of all branches add --single-branch
git clone -b gh-pages . dist

# Checkout changes from local master
# Using git without having to change directory
# http://stackoverflow.com/questions/5083224/git-pull-while-not-in-a-git-directory
git -C dist checkout origin/master -- :/index.html :/lib

# Sync dependencies keeping full path (-R)
rsync -avR node_modules/react/dist dist
rsync -avR node_modules/bootstrap/dist dist
rsync -avR node_modules/font-awesome/css dist
rsync -avR node_modules/font-awesome/fonts dist

# Commit with the last commit message from master
git -C dist commit -m "$(git log master -1 --pretty=%B)"

# This only pushes to the origin, that is, the local repo from where
# this temporary repo was cloned
#git -C dist push origin gh-pages

# Push to remote gh-pages
git -C dist push https://github.com/dreyescat/react-rating.git gh-pages

# Remove temporary dist folder
rm -rf dist
