<<<<<<< HEAD
//This function is used to catch errors in async functions and pass them to the next middleware
const handleCatchError = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => next(error));
};

export default handleCatchError;
=======
//This function is used to catch errors in async functions and pass them to the next middleware
const handleCatchError = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => next(error));
};

export default handleCatchError;
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
