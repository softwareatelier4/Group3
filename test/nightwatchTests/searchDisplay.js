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
      .assert.urlContains("profile")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .setValue('input[name=lfname]', 'Peter')
      .click("#search-button")
      .waitForElementPresent('#freelancer',2000)
      .waitForElementVisible('#freelancer',2000)

      .assert.visible('#sliderContainer')
      .click('.button')
      .waitForElementVisible('.row-container', 2000)
      .waitForElementVisible('#search-container', 2000)
      .waitForElementNotVisible('#sliderDescription', 2000)

      .waitForElementVisible(".profile-display",2000)

      // .click("#logout-button")
      // .assert.urlEquals("http://localhost:4000/search")
      .end()
      }
}
module.exports = {
  'searchShortFindName':function(client){
    client
      .url("localhost:4000/search.html")
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.urlEquals("http://localhost:4000/search.html")
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .setValue('input[name=lfname]', 'Pet')
      .click("#search-button")
      .waitForElementPresent('#freelancer',2000)
      .waitForElementVisible('#freelancer',2000)

      .assert.visible('#sliderContainer')
      .click('.button')
      .waitForElementVisible('.row-container', 2000)
      .waitForElementVisible('#search-container', 2000)
      .waitForElementNotVisible('#sliderDescription', 2000)


      .end()
  }
}

module.exports = {
  'searchFindName2':function(client){
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

      .assert.visible('#sliderContainer')
      .click('.button')
      .waitForElementVisible('.row-container', 2000)
      .waitForElementVisible('#search-container', 2000)
      .waitForElementNotVisible('#sliderDescription', 2000)

      .assert.urlContains('profile')
      // .click("#logout-button")
      // .assert.urlEquals("http://localhost:4000/search")

      .end()
  }
}
