#!/usr/bin/env sh

set -e

pkgName=$1
version=$2

if [ -z "$pkgName" ]; then
  echo "the pkgName is error."
  exit 0
fi


if [ $pkgName == 'auth' ]; then
  dir="../xterio-auth"
  rsync -av --exclude='node_modules' ../examples/example-auth ../xterio-auth
  rsync -av --exclude='node_modules' ../examples/example-auth-react ../xterio-auth
  rsync -av --exclude='node_modules' ../examples/example-auth-vue ../xterio-auth
elif [ $pkgName == "wallet" ]; then
  dir="../xterio-wallet"
  rsync -av --exclude='node_modules' ../examples/example-wallet-react ../xterio-wallet
fi

cd $dir

pwd_output=$(pwd)
cmg="release $pkgName v$version"
branch=release/$pkgName/$version

echo "dir=$pwd_output"
echo "pkgName=$pkgName"
echo "version=$version"
echo "msg=$cmg"
echo "branch=$branch"

git init
git add -A
git commit -m "$cmg"

git push -f git@github.com:XterioTech/XterioSDK-Web.git main:$branch

rm -rf .git

if [ $pkgName == 'auth' ]; then
  rm -rf example-auth example-auth-react example-auth-vue
elif [ $pkgName == "wallet" ]; then
  rm -rf example-wallet-react
fi

cd -