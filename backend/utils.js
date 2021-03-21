import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Barearer
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (error, decode) => {
        if (error) {
          return res.status(400).send({ message: "Invalid Token" });
        }
        req.user = decode;
        next();
      }
    );
  } else {
    res.status(401).send({ message: "There is no token Body" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "You are not admin!" });
  }
};