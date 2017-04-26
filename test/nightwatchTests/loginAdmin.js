module.exports = {
  'testAdmin':function(client){
    client
      .url("localhost:4000/admin.html")// .url("localhost:4000/index.html"
      .waitForElementVisible('body',2000)
      .assert.visible('input[name=userName]')

      .setValue('input[name=userName]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('#login-button')
      .waitForElementVisible('#logo',2000)
      .end()
  }
}
