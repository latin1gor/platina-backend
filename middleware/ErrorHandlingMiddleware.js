import ApiError from "../error/ApiError.js";

function ErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unmatched error" });
}

export default ErrorHandler;
