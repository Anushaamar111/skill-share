import jwt from "jsonwebtoken";

 const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized with token",
        success: false,
      });
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to authenticate",
      success: false,
    });
  }
};

export {isAuthenticated}
