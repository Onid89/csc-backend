const errorHandler = (res, error) => {
    res.status(500).json({ errorMessage: error });
};
export default errorHandler;
