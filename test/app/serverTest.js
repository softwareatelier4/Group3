let should = require("should")
let app = require("../../app")
let request = require('supertest');

describe("test server response", function(){
	it("should return 200 for /GET index.html",function(done){
		request(app)
			.get("/index.html")
			.expect(200,done)
	})
})
