import JSend from '../services/Jsend'
import Scarper from '../services/scarper'
/**
 * The Route that parse the data from the url using the passed params
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = app => {
    app.get("/fetch/", (req, res) => {
        //Usually I don't write any business logic inside routes file instead  I use a controller to verify the params get result from service file and send the response, the service file which handle the business logic/ call db models
        // ex:
        // app.route('/customers/')
        //     .all(app.auth.authenticate())
        //     .get(CustomerController.getAllCustomers)
        if (req.query.url) {
            const url = req.query.url;
            if (Scarper.isValidURL(url)) {
                Scarper.fetch(url).then(result => JSend.success(res, result))
                    .catch(err =>{
                        if (err.cause && err.cause.code === 'ENOTFOUND') {
                            JSend.failWithBadRequest(res, `The site ${err.cause.host} is not found or down`)
                        } else {
                            JSend.failGenericServerError(res, err.message)
                        }
                    })
            } else {
                JSend.failUnprocessableEntity(res, "The Url is not valid")
            }
        } else {
            JSend.failUnprocessableEntity(res, "You need to pass url as query")
        }

    });
};
