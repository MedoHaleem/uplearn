module.exports = app => {
    // this to prevent test from running several instance of the app
    if (process.env.NODE_ENV !== "test") {
        app.listen(app.get("port"), () => {
            console.log(`UpLearn API - Port ${app.get("port")}`);
        });
    }
};