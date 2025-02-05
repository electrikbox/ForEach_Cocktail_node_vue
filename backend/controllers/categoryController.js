import { db } from "../config/db.js";



// Create a new category
// ============================================================================

const createCategory = (req, res) => {
  const { nom } = req.body;

  if (!nom)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  const query = "INSERT INTO categories (nom) VALUES (?)";

  db.query(query, [nom], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création de la categorie" });
    if (!result) return res.status(400).json({ message: "Erreur lors de la création de la categories" });
    res.status(201).json({ message: "categorie créé" });
  });
};



// Get all categories
// ===========================================================================

const getAllCategories = (req, res) => {
  const query = "SELECT * FROM categories ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération des categories" });
    if (!result) return res.status(404).json({ message: "Aucune categorie trouvé" });
    res.status(200).json(result);
  });
};



// Get 1 category
// ============================================================================

const getCategory = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM categories WHERE id = ?";
  
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la récupération de la categorie" });
      if (!result) return res.status(404).json({ message: "Aucun categorie trouvé" });
      res.status(200).json(result);
    });
  };



// Update category by id
// ============================================================================

const updateCategory = (req, res) => {
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
  const query = `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour de la categorie" });
    if (!result) return res.status(404).json({ message: "Categorie non trouvé" });
    res.status(200).json({ message: "Categorie mis à jour" });
  });
};



// Delete category by id
// ============================================================================

const deleteCategory = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM categories WHERE id = ?";
    
    db.query(query, id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression de la categories" });
        if (!result) return res.status(404).json({ message: "Categorie non trouvé" });
        res.status(200).json({ message: "Categories supprimé" });
    });
};


// Export controller functions
export default {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
