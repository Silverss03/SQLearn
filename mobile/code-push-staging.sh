echo 
echo Deploy to IOS Staging
appcenter codepush release-react -a dkhactam/SportPodcast-IOS -d Staging -t '*' --disable-duplicate-release-error

echo 
echo Deploy to ANDROID Staging
appcenter codepush release-react -a dkhactam/SportPodcast-Android -d Staging -t '*' --disable-duplicate-release-error
