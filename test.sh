npm install
bower install
node seed.js
npm run test
npm start &
PID=$!
sleep 2
./nightwatch
kill $PID
