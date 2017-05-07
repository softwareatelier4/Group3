// module.exports = {
//   'testSignUp':function(client){
//     client
//       .url("localhost:4000/sign-up")
//       .useCss()
//       .waitForElementVisible('body', 1000)
//       .assert.urlEquals("http://localhost:4000/sign-up")
//       .assert.visible('#search-button')
//       .assert.visible('.profile-container')
//       .assert.visible('.button')
//
//       .setValue('input[name=lfname]', 'FakeAndWirdstuff')
//       .click("#search-button")
//       .waitForElementNotPresent('#freelancer',2000)
//
//       .end()
//   }
// }
