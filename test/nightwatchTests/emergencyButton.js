module.exports = {
  'emergencyButtonTest':function(client){
    client
    .url("localhost:4000/search.html")
    .useCss()
    .waitForElementVisible('body',1000)
    .assert.visible('.emergency')
    .assert.visible('.input')
    // .assert.visible('emForm')
    // .assert.visible('emergencySearch')


    .click('#emergency')
    .waitForElementVisible('body',1000)
    .assert.urlEquals("http://localhost:4000/emergency.html")




    .end()
  }
}

module.exports = {
  'emergencyFindsth':function(client){
    client
    .url("localhost:4000/search.html")
    .useCss()
    .waitForElementVisible('body',1000)
    .assert.visible('.emergency')
    .assert.visible('.input')
    // .assert.visible('emForm')
    // .assert.visible('emergencySearch')


    .click('.emergency')
    .waitForElementVisible('body',1000)
    .assert.urlEquals("http://localhost:4000/emergency.html")
    .setValue('input[name=esname]', 'carpenter')
    .click('#findclosest')
    .pause(7000)
    .assert.visible('#imgdiv')




    .end()
  }
}


module.exports = {
  'emergencydontFindsth':function(client){
    client
    .url("localhost:4000/search.html")
    .useCss()
    .waitForElementVisible('body',1000)
    .assert.visible('.emergency')
    .assert.visible('.input')
    // .assert.visible('emForm')
    // .assert.visible('emergencySearch')


    .click('.emergency')
    .waitForElementVisible('body',1000)
    .assert.urlEquals("http://localhost:4000/emergency.html")
    .setValue('input[name=esname]', '11')
    .click('#findclosest')
    .pause(1000)
    // .assert.elementNotPresent('#imgdiv')



    .end()
  }
}
