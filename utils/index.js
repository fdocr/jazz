exports.errorTypes = errorTypes();
exports.CustomError = CustomError;  //TODO: Set CustomError to proper name (?)
                                    //If modified change in 'middleware' too

function CustomError(err) {
  this.status = err.status;
  this.message = err.message;
  Error.captureStackTrace(this, CustomError);
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

function errorTypes() {
	return {
		//https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
		incorrectParameters : {
			status : 400,
			message : 'Incorrect or missing parameters.'
		},
		unauthorized : {
			status : 401,		//http://stackoverflow.com/a/6937030/3462026
			message : 'Unauthorized.'
		},
		accessDenied : {
			status : 403,		//http://stackoverflow.com/a/6937030/3462026
			message : 'Access denied.'
		},
    notFound : {
			status : 404,
			message : 'Not found.'
		},
		noTokenProvided : {
			status : 405,
			message : 'No token provided.'
		},
		internalServerError : {
			status : 500,
			message : 'Internal server error.'
		},
		databaseError : {
			status : 501,
			message : 'Database connection error'
		}
	};
}
