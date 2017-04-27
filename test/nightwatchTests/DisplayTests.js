module.exports = {
  'search':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.urlEquals("http://localhost:4000/search.html")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .end()
  }
}
