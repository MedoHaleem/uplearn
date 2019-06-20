import JSend from '../services/Jsend'
import Scarper from '../services/scarper'
/**
 * The Route that parse the data from the url using the passed params
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = app => {
    app.get("/fetch/", (req, res) => {
        const url = req.query.url;
        if (Scarper.isValidURL(url)) {
            Scarper.fetch(url).then(result => JSend.success(res, result))
                .catch(err =>{
                    if (err.cause.code === 'ENOTFOUND') {
                      JSend.failWithBadRequest(res, `The site ${err.cause.host} is not found or down`)
                    } else {
                        JSend.failGenericServerError(res, err.message)
                    }
                })
        } else {
            JSend.failUnprocessableEntity(res, "The Url is not valid")
        }
    });
};
