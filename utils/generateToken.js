import jwt from "jsonwebtoken";

const generateToken = (res, user, message) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({
    success: true,
    message: message,
    token: token,
  });
};

export default generateToken ;
