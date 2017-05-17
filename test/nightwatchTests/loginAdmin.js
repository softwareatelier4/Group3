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
      .assert.visible('.element-display')
      .assert.visible('.button')
      .end()
  }
}

module.exports = {
  'testFailAdmin':function(client){
    client
      .url("localhost:4000/admin.html")// .url("localhost:4000/index.html"
      .waitForElementVisible('body',2000)
      .assert.visible('input[name=userName]')
      .setValue('input[name=userName]', 'fake')
      .setValue('input[name=password]', 'wrong')
      .click('#login-button')
      .waitForElementVisible('#login-button',2000)
      .end()

  }
}

module.exports = {
  'testFailAdmin':function(client){
    client
      .url("localhost:4000/admin.html")// .url("localhost:4000/index.html"
      .waitForElementVisible('body',2000)
      .assert.visible('input[name=userName]')
      .setValue('input[name=userName]', '')
      .setValue('input[name=password]', '')
      .click('#login-button')
      .waitForElementVisible('#login-button',2000)
      .end()

  }
}
