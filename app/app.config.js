'use strict';

// This file is for AJAX Service. It will call getPath function to get URL for specific URL's API
AppSettings.ApiPath = AppSettings.baseApiUrl;
window.ApiPaths = {
    'templateCallKey': 'templateCallURL',
    'getPath': function(path) {
        return AppSettings.ApiPath + ApiPaths[path];
    }
}
