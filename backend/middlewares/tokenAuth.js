import jsonwebtoken from "jsonwebtoken";

const tokenAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Accès refusé : aucun token fourni" });

  const token = authHeader;

  try {
    const decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token non valide" });
  }
};

export default tokenAuth;