exports.index = function* () {
    this.body = yield {
        success: 'Admin'
    };
};
