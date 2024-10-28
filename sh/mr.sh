#!/bin/bash
set - e

data=$(<sensitive.txt)
gh_token=$(echo "$data" | grep "^gh_token=" | cut -d'=' -f2)
gl_token=$(echo "$data" | grep "^gl_token=" | cut -d'=' -f2)
echo "gh_token=$gh_token"
echo "gl_token=$gl_token"

# https://github.com/chenwei0922/xterio-sdk/
# github
# githubUrl="https://api.github.com"
# owner="chenwei0922"
# repo="xterio-sdk"
# accessToken=$gh_token
# data='{
#   "title": "merge request after publish",
#   "head": "npm-publish",
#   "base": "main"
# }'
# response=$(curl -X POST -H "Authorization: token $accessToken" -d "$data" "$githubUrl/repos/$owner/$repo/pulls")
# url=$(python3 -c "import json,sys;obj=json.loads(sys.argv[1]);print(obj['html_url'])" "$response")
# {"url":"https://api.github.com/repos/chenwei0922/xterio-sdk/pulls/3", ...}

# gitlab
gitlabUrl="https://gitlab.itlibecc.com/api/v4"
projectID="70"
accessToken=$gl_token
title="merge request after publish"
sourceBranch="npm-publish"
targetBranch="main"

response=$(curl -X POST -H "PRIVATE-TOKEN: $accessToken" -d "source_branch=$sourceBranch" -d "target_branch=$targetBranch" -d "title=$title" "$gitlabUrl/projects/70/merge_requests")
url=$(python3 -c "import json,sys;obj=json.loads(sys.argv[1]);print(obj['web_url'])" "$response")
# {"web_url":"https://gitlab.itlibecc.com/changying/platform/xteriosdk-web/-/merge_requests/7", ...}

if [ -n "$url" ] ; then
  echo "[mr] Pull request created success.✅"
  echo "[mr] The detail is: $url"
else
  echo "[mr] Pull request created failure.❌"
  echo "$response"
fi