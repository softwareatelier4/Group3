module.exports = {
  'test':function(client){
    client
      .url("localhost:4000/index.html")// .url("localhost:4000/index.html")
      .useCss()
      .waitForElementVisible('body',2000)
      .assert.visible('#logo')
      .end()
  }
}
