module.exports = {
  'myProfile':function(client){
    client
      .url("localhost:4000/index.html")// .url("localhost:4000/index.html")
      .useCss()
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/index.html")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .click('#myprofile')
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/myprofile")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('#edit')
      .assert.visible('#plus')
}}

module.exports = {
  'myProfile+edit':function(client){
    client
      .url("localhost:4000/index.html")// .url("localhost:4000/index.html")
      .useCss()
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/index.html")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .click('#myprofile')
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/myprofile")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('#edit')
      .click('#edit')
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/profile-edit")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')



      .end()
  }
}

module.exports = {
  'myProfile':function(client){
    client
      .url("localhost:4000/index.html")// .url("localhost:4000/index.html")
      .useCss()
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/index.html")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('.profile-container')
      .assert.visible('.button')
      .click('#myprofile')
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/myprofile")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('#edit')
      .assert.visible('#plus')
      .click('#plus')
      .waitForElementVisible('body',1000)
      .assert.urlEquals("http://localhost:4000/create-freelancer")
      .assert.visible('#logo')
      .assert.visible('#myprofile')
      .assert.visible('#search-button')
      .assert.visible('#createFreelancer')



      .end()
  }
}
