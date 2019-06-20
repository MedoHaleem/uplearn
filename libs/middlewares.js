import bodyParser from "body-parser";
import cors from "cors";

module.exports = app => {
    app.set("port", app.libs.config.port);
    app.set("json spaces", 4);
    app.use(cors({
        //we limit allowed domain, I'm putting 3001 a fake port assuming we fake app requesting this service
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(bodyParser.json());
};