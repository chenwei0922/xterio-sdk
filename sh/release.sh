#!/usr/bin/env sh

set -e

pkgName=$1
version=$2
if [ $pkgName == 'auth' ]; then
  dir="../xterio-auth"
elif [ $pkgName == "wallet" ]; then
  dir="../xterio-wallet"
fi

if [ -z "$dir" ]; then
  echo "the pkgName is error."
  exit 0
fi

cd $dir

pwd_output=$(pwd)
cmg="release $pkgName v$version"

echo "dir=$pwd_output"
echo "pkgName=$pkgName"
echo "version=$version"
echo "msg=$cmg"

git init
git add -A
git commit -m "$cmg"

git push -f gitlab.itlibecc.com/changying/platform/xteriosdk-web.git main:release/$pkgName/$version
cd -