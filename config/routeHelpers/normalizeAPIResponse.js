/**********
 * Utility for normalizing the API response
 **********/

// Check if a supplied data object is an array and if so, 
// append to the supplied object with the appropriate plurality
function* assignMulti(data, type, obj) {

    if (Array.isArray(data)) {
        obj[type + 's'] = data;
        yield obj;
    } else if (typeof data === 'object') {
        obj[type] = data;
        yield obj;
    } else {
        return false;
    }
}




module.exports = function* (options) {

    // The final response object
    var response = {};

    // Check for many posts
    yield assignMulti(options.posts, 'post', response);
    
    // Check for many projects
    yield assignMulti(options.projects, 'project', response);

    response.path = options.path;

    response.isAuthenticated = options.req.isAuthenticated() || false;

    response.history = true;

    return response;
};
