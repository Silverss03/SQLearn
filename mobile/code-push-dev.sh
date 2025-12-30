echo 
echo Deploy to IOS Develop
appcenter codepush release-react -a dkhactam/SportPodcast-IOS -d Develop -t '*' --disable-duplicate-release-error

echo 
echo Deploy to ANDROID Develop
appcenter codepush release-react -a dkhactam/SportPodcast-Android -d Develop -t '*' --disable-duplicate-release-error
