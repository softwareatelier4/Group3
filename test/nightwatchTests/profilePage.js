module.exports = {
  'profileTesting':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body',1000)
      .assert.visible('#logo')
      .click('.button')
      .waitForElementVisible('.row-container', 1000)
      .assert.urlContains('profile')
      .assert.elementPresent('#contact-container')
      // .click('.fa.fa-skype')
      // .assert.urlContains('profile/asfd')
      .assert.elementPresent('#pictureInput')


      
      .end()
  }
}
