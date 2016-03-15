define(['./module'], function (filters) {
    'use strict';

    return filters.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

});