module.exports = {
    'prova' : function(client){
        client
            .url("localhost:4000/index.html")
            .useCss()
            .waitForElementVisible('body',2000)
            .assert.containsText("#welcome", "Welcome, ")
            .assert.visible("#search-button")
            .assert.title("")
            .end()
    }
};
