module.exports = {
  'searchNoName':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.urlEquals("http://localhost:4000/search.html")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .setValue('input[name=lfname]', 'FakeAndWirdstuff')
      .click("#search-button")
      .waitForElementNotPresent('#freelancer',2000)

      .end()
  }
}
module.exports = {
  'searchFindName':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.urlEquals("http://localhost:4000/search.html")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .setValue('input[name=lfname]', 'Peter')
      .click("#search-button")
      .waitForElementPresent('#freelancer',2000)
      .waitForElementVisible('#freelancer',2000)

      .end()
  }
}
module.exports = {
  'searchFindName':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.urlEquals("http://localhost:4000/search.html")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .setValue('input[name=lfname]', 'Peter')
      .click("#search-button")
      .waitForElementPresent('#freelancer',2000)
      .waitForElementVisible('#freelancer',2000)

      .end()
  }
}
