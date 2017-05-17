module.exports = {
  'test':function(client){
      client
        .url("localhost:4000/index.html")
        .useCss()
        .waitForElementVisible('body', 2000)
        .assert.elementPresent("#welcome")
        // .assert.elementPresent("#edit/login_button")
        // .assert.elementPresent("#edit-button")
        client
        .url("localhost:4000/profile-edit.html")
        .useCss()
        .waitForElementVisible('body', 4000)
        .assert.elementPresent("#description")
        // .assert.elementPresent("#Location")
        .assert.elementPresent("#PhoneNumber")
        .assert.elementPresent("paper-input[label = Website]")
        .assert.elementPresent("paper-input[label = Skype]")
        .assert.elementPresent("paper-input[label = Facebook]")
        .assert.elementPresent("paper-input[label = Linkedin]")
        .assert.elementPresent("paper-input[label = Github]")
        // .assert.elementPresent("#profilepicture")
        // .assert.elementPresent("#editButton")

        // .assert.elementPresent("#idInput")
        // .assert.elementPresent("#cvInput")
        // .assert.elementPresent("#extraInput")
        // .assert.elementPresent("#freelancerButton")
        .end()

    }
}
