npm install
bower install
node seed.js
npm run test
npm start &
PID=$!
sleep 2
xvfb-run -a ./nightwatch
# ./nightwatch #the tests work if run on a local machine
kill $PID
