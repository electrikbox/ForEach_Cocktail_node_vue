import { db } from "../config/db.js";



// Create a new cocktail
// ============================================================================

const createCocktail = (req, res) => {
  const { nom, description, verre, garniture, alcoolise } = req.body;

  if (!nom || !description || !verre || !garniture || !alcoolise)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  const query = "INSERT INTO cocktails (nom, description, verre, garniture, alcoolise) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [nom, description, verre, garniture, alcoolise], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création du cocktail" });
    if (!result) return res.status(400).json({ message: "Erreur lors de la création du cocktail" });
    res.status(201).json({ message: "cocktail créé" });
  });
};



// Get all cocktails
// ============================================================================

const getAllCocktails = (req, res) => {
  const query = "SELECT * FROM cocktails ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des cocktails" });
    if (!result) return res.status(404).json({ message: "Aucun cocktail trouvé" });
    res.status(200).json(result);
  });
};



// Get 1 cocktails
// ============================================================================

const getCocktail = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM cocktails WHERE id = ?";
  
    db.query(query, [id],(err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la récupération des cocktails" });
      if (!result) return res.status(404).json({ message: "Aucun cocktail trouvé" });
      res.status(200).json(result);
    });
  };



// Update cocktail by id
// ============================================================================

const updateCocktail = (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.nom) {
    fields.push("nom = ?");
    values.push(req.body.nom);
  }
  if (req.body.description) {
    fields.push("description = ?");
    values.push(req.body.description);
  }
  if (req.body.verre) {
    fields.push("verre = ?");
    values.push(req.body.verre);
  }
  if (req.body.garniture) {
    fields.push("garniture = ?");
    values.push(req.body.garniture);
  }
  if (req.body.alcoolise) {
    fields.push("alcoolise = ?");
    values.push(req.body.alcoolise);
  }

  if (fields.length === 0)
    return res.status(400).json({ message: "Aucun paramètre soumis pour la mise à jour" });

  values.push(id);
  const query = `UPDATE cocktails SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour du cocktail" });
    if (!result) return res.status(404).json({ message: "Cocktail non trouvé" });
    res.status(200).json({ message: "Cocktail mis à jour" });
  });
};



// Delete cocktail by id
// ============================================================================

const deleteCocktail = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM cocktails WHERE id = ?";
    
    db.query(query, id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression du cocktail" });
        if (!result) return res.status(404).json({ message: "Cocktail non trouvé" });
        res.status(200).json({ message: "Cocktail supprimé" });
    });
};


// Export controller functions
export default {
    createCocktail,
    getAllCocktails,
    getCocktail,
    updateCocktail,
    deleteCocktail
};
