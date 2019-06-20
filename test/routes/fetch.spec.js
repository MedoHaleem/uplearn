describe("Routes: Fetch", () => {
   describe("GET fetch/query", () => {
       describe("status 200", () =>{
           it("returns Obj with assets and links params", () => {
               return request.get(`/fetch/?url=http://www.google.com`)
                   .expect(200)
                   .then(res => {
                       expect(res.body.data).to.include.keys("assets");
                       expect(res.body.data).to.include.keys("links");
                   })
           });
       });
       describe("error status", () =>{
           it("throws an error if url was not passed", () => {
               return request.get(`/fetch`)
                   .expect(422)
                   .then(res => {
                       expect(res.body.status).to.eql("error");
                       expect(res.body.message).to.eql("You need to pass url as query");
                   })
           });
           it("throws an error with invalid url", () => {
               return request.get(`/fetch/?url=google`)
                   .expect(422)
                   .then(res => {
                       expect(res.body.status).to.eql("error");
                       expect(res.body.message).to.eql("The Url is not valid");
                   })
           });
           it("throws an error with url that have site down or don't exists", () => {
               return request.get(`/fetch/?url=http://www.1232131something.com`)
                   .expect(400)
                   .then(res => {
                       expect(res.body.status).to.eql("error");
                       expect(res.body.message).to.eql("The site www.1232131something.com is not found or down");
                   })
           });
       })
   })
});