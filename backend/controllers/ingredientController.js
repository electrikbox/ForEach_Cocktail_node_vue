import { db } from "../config/db.js";



// Create a new ingredient
// ============================================================================

const createIngredient = (req, res) => {
  const { nom } = req.body;

  if (!nom)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  const query = "INSERT INTO ingredients (nom) VALUES (?)";

  db.query(query, [nom], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création de l'ingredient" });
    if (!result) return res.status(400).json({ message: "Erreur lors de la création de l'ingredient" });
    res.status(201).json({ message: "cocktail créé" });
  });
};



// Get all ingredients
// ===========================================================================

const getAllIngredient = (req, res) => {
  const query = "SELECT * FROM ingredients ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des ingredients" });
    if (!result) return res.status(404).json({ message: "Aucun ingredient trouvé" });
    res.status(200).json(result);
  });
};



// Get 1 ingredient
// ============================================================================

const getIngredient = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM ingredients WHERE id = ?";
  
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la récupération de l' ingredients" });
      if (!result) return res.status(404).json({ message: "Aucun ingredient trouvé" });
      res.status(200).json(result);
    });
  };



// Update ingredient by id
// ============================================================================

const updateIngredient = (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.nom) {
    fields.push("nom = ?");
    values.push(req.body.nom);
  }

  if (fields.length === 0)
    return res.status(400).json({ message: "Aucun paramètre soumis pour la mise à jour" });

  values.push(id);
  const query = `UPDATE ingredients SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour de l'ingredient" });
    if (!result) return res.status(404).json({ message: "Ingredient non trouvé" });
    res.status(200).json({ message: "Ingredient mis à jour" });
  });
};



// Delete ingredient by id
// ============================================================================

const deleteIngredient = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM ingredients WHERE id = ?";
    
    db.query(query, id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression de l'ingredient" });
        if (!result) return res.status(404).json({ message: "Ingredient non trouvé" });
        res.status(200).json({ message: "Ingredient supprimé" });
    });
};


// Export controller functions
export default {
    createIngredient,
    getAllIngredient,
    getIngredient,
    updateIngredient,
    deleteIngredient
};
