npm install
bower install
node seed.js
npm run test
npm start &
PID=$!
sleep 2
xvfb-run -a -e /dev/stdout --  ./nightwatch
kill $PID
