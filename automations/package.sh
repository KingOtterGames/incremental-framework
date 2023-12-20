LIB_VERSION=$(npm pkg get version --workspaces=false | tr -d \")
NAME=$(npm pkg get name --workspaces=false | tr -d \")
FULL="full_v$LIB_VERSION"
DEMO="demo_v$LIB_VERSION"

rimraf ./package
mkdir package

npm run clean
npm run build
npm run pack
7z a -tzip ./package/$FULL-STEAM.zip ./dist/win-unpacked/*
7z a -tzip ./package/$FULL-WEB.zip ./build/*

npm run clean
npm run build:demo
npm run pack
7z a -tzip ./package/$DEMO-STEAM.zip ./dist/win-unpacked/*
7z a -tzip ./package/$DEMO-WEB.zip ./build/*

# STEAM RELEASE
mkdir package/"$NAME"_v"$LIB_VERSION"_STEAM/
mv package/$FULL-STEAM.zip package/"$NAME"_v"$LIB_VERSION"_STEAM/
mv package/$DEMO-STEAM.zip package/"$NAME"_v"$LIB_VERSION"_STEAM/

# WEB RELEASE
mkdir package/"$NAME"_v"$LIB_VERSION"_WEB/
mv package/$FULL-WEB.zip package/"$NAME"_v"$LIB_VERSION"_WEB/
mv package/$DEMO-WEB.zip package/"$NAME"_v"$LIB_VERSION"_WEB/

# Put Together
mkdir package/"$NAME"_v"$LIB_VERSION"
mv package/"$NAME"_v"$LIB_VERSION"_WEB/ package/"$NAME"_v"$LIB_VERSION"
mv package/"$NAME"_v"$LIB_VERSION"_STEAM/ package/"$NAME"_v"$LIB_VERSION"