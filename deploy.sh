#!/bin/sh

# Stops execution on errors
set -e

# Build directory
BUILD_DIR=build

# Which branch to deploy to (e.g. master, gh-pages)
DEPLOY_BRANCH=master

# Current branch for subtree splitting
CUR_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Calling build process
node .

# Staging build dir (with `--force` because this dir should be on .gitignore)
git add -f $BUILD_DIR

# Commiting changes (requires commit message)
git commit

# Pushing to master branch
git push origin `git subtree split --prefix $BUILD_DIR $CUR_BRANCH`:$DEPLOY_BRANCH --force

# Restoring state before build process
git reset --hard HEAD~1
