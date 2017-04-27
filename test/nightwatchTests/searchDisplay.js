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
      .assert.visible('#sliderContainer')
      .click('.button')
      .waitForElementVisible('.row-container', 2000)
      .waitForElementVisible('#search-container', 2000)
      .waitForElementNotVisible('#sliderDescription', 2000)
      .click("#logout-button")
      .assert.urlEquals("http://localhost:4000/search")
      .end()
  }
}
