#!/bin/bash
set -e

pkgName=$1
version=$2
# [11,22,33] => 11,22,33 => (11 22 33)
# 将传入的逗号分隔的字符串转换为数组， tr可理解成replace，适合简单分割
# result=($(echo $3 | tr ',' ' '))
IFS=',' read -ra result <<< "$3"

msg=""
for item in "${result[@]}"
do
  msg="$msg- $item"$'\n'
done
# echo "msg=$msg"
# exit

data=$(<sensitive.txt)
gh_token=$(echo "$data" | grep "^gh_token=" | cut -d'=' -f2)

if [ -z "$pkgName" ]; then
  echo "the pkgName is error."
  exit 0
fi


if [ $pkgName == 'auth' ]; then
  prd="xterio-auth"
  rsync -av --exclude='node_modules' ../examples/example-auth "../$prd"
  rsync -av --exclude='node_modules' ../examples/example-auth-react "../$prd"
  rsync -av --exclude='node_modules' ../examples/example-auth-vue "../$prd"
elif [ $pkgName == "wallet" ]; then
  prd="xterio-wallet"
  rsync -av --exclude='node_modules' ../examples/example-wallet-react "../$prd"
fi

cd ../
zip -r "${prd}-${version}.zip" "$prd" -x "$prd/dist/*" "$prd/coverage/*" "$prd/node_modules/*"

echo "prd=$prd"
echo "pkgName=$pkgName"
echo "version=$version"
echo "msg=$msg"


# 设置 GitHub 的 personal access token
# 注意：为了使用 GitHub API，你需要生成一个具有 repo 权限的个人访问令牌
# 你可以在 GitHub 的 Settings -> Developer settings -> Personal access tokens 中生成令牌
export GH_TOKEN="$gh_token"

# 设置发布的版本号和标题
VERSION="$version-$pkgName"
TITLE="Release $pkgName v$version"
MESSAGE=$msg

# 设置默认仓库
gh repo set-default https://github.com/XterioTech/XterioSDK-Web

# 创建一个发布
gh release create "$VERSION" --title "$TITLE" --notes "$MESSAGE" "${prd}-${version}.zip#${prd} (zip) "

# 发布特定目录到特定分支
branch=release/$pkgName/$version
git subtree split -P "$prd" -b "$branch"
git push git@github.com:XterioTech/XterioSDK-Web.git "$branch"

# 上传构建文件或者源代码文件
# gh release upload $VERSION a.zip

rm -rf "${prd}-${version}.zip"

cd $prd
pwd=$(pwd)
echo "pwd=$pwd"

# 每次发版的包，zip管理，不再用单独的分支
# 原因：以下锁版本的方法，还是无法进行compare。因此若要比较前后差异，还是用仓库源码来吧
# compare原理，是从提交历史拉取记录比较的，并且tag只针对整个仓库，无法针对特定目录。
# branch=release/$pkgName/$version
# git init
# git add -A
# git commit -m "$TITLE"
# git push -f git@github.com:XterioTech/XterioSDK-Web.git main:$branch
# rm -rf .git

if [ $pkgName == 'auth' ]; then
  rm -rf example-auth example-auth-react example-auth-vue
elif [ $pkgName == "wallet" ]; then
  rm -rf example-wallet-react
fi
cd ..