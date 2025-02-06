import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import xss from "xss";



// Create a new user
// ============================================================================

const createUser = (req, res) => {
  let { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  nom = xss(nom);
  email = xss(email);
  mot_de_passe = xss(mot_de_passe);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(mot_de_passe, salt);

  const query = "INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)";

  db.query(query, [nom, email, hash], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    if (!result) return res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
    res.status(201).json({ message: "Utilisateur créé" });
  });
};



// Get all users
// ============================================================================

const getAllUsers = (req, res) => {
  const query = "SELECT * FROM utilisateurs ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    if (!result) return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    res.status(200).json(result);
  });
};



// Get 1 users
// ============================================================================

const getUser = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM utilisateurs WHERE id = ?";

  db.query(query, [id],(err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    if (!result) return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    res.status(200).json(result);
  });
};



// Update user by id
// ============================================================================

const updateUser = (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.nom) {
    fields.push("nom = ?");
    values.push(req.body.nom);
  }
  if (req.body.email) {
    fields.push("email = ?");
    values.push(req.body.email);
  }
  if (req.body.mot_de_passe) {
    fields.push("mot_de_passe = ?");
    values.push(req.body.mot_de_passe);
  }

  if (fields.length === 0)
    return res.status(400).json({ message: "Aucun paramètre soumis pour la mise à jour" });

  values.push(id);
  const query = `UPDATE utilisateurs SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    if (!result) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur mis à jour" });
  });
};



// Delete user by id
// ============================================================================

const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM utilisateurs WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé" });
  });
}



//login
// ============================================================================

const userLogin = (req, res) => {
  let { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  email = xss(email);
  mot_de_passe = xss(mot_de_passe);

  const query = "SELECT * FROM utilisateurs WHERE email = ?";
  
  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la connexion" });
    if (result.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    try {
      const user = result[0];
      const isMatched = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
      if (!isMatched) return res.status(401).json({ message: "Mot de passe incorrect" });

      const token = jwt.sign({ email: user.email, nom: user.nom, id: user.id}, process.env.TOKEN_SECRET, { expiresIn: "24h" });

      // Ajout du préfixe Bearer et exposition de l'en-tête Authorization
      res.setHeader("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "Authorization");
      res.status(200).json({ message: "Connexion réussie" });
    } catch (compareError) {
      return res.status(500).json({ message: "Erreur lors de la comparaison des mots de passe" });
    }
  });
};



// Check token
// ============================================================================

const checkToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token manquant ou mal formaté" });

  const token = authHeader;

  try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const query = "SELECT * FROM utilisateurs WHERE id = ?";

      db.query(query, [decoded.id],(err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération de l' utilisateur" });
        if (!result) return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        res.status(200).json({ message: "Token valide" });
      });

  } catch (error) {
      console.error("Erreur de validation du token:", error.message);
      return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}



// Export controller functions
export default {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    userLogin,
    checkToken
};
