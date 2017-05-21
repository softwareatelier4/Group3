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

// module.exports = {
//   'test':function(client){
//     client
//       .url("localhost:4000/index.html")// .url("localhost:4000/index.html")
//       .useCss()
//       .waitForElementVisible('body',1000)
//       .assert.visible('#logo')
//       .end()
//   },
//   'login-test+log -out':function(client){
//     client
//       .url("localhost:4000/login")
//       .useCss()
//       .waitForElementVisible('body',1000)
//       .assert.visible("input[name=password]")
//       .assert.visible("input[name=userName]")
//       .setValue("input[name=password]","ciao")
//       .setValue("input[name=userName]","masiar")
//       .click("#login-button")
//       .waitForElementVisible("big-component",1000)
//       .pause(10000)
//       .assert.visible("#logout-button")
//       .click("#logout-button")
//       .waitForElementVisible("#login-button",1000)
//
//       .end()
//   }
// }
