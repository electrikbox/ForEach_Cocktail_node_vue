import { db } from "../config/db.js";



// Create a new etapesPreparation
// ============================================================================

const createEtapesPreparation = (req, res) => {
  const { cocktail_id, etape, ordre } = req.body;

  if (!cocktail_id || !etape || !ordre)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  const query = "INSERT INTO etapes_preparation (cocktail_id, etape, ordre) VALUES (?, ?, ?)";

  db.query(query, [cocktail_id, etape, ordre], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création de l' étape de préparation" });
    if (!result) return res.status(400).json({ message: "Erreur lors de la création de l' étape de préparation" });
    res.status(201).json({ message: "etape de Preparation créé" });
  });
};



// Get all etapesPreparation
// ============================================================================

const getAllEtapesPreparations = (req, res) => {
  const query = "SELECT * FROM etapes_preparation ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la récupération de l' étape de préparation" });
    if (!result) return res.status(404).json({ message: "Aucune étape de préparation trouvé" });
    res.status(200).json(result);
  });
};



// Get 1 etapesPreparation
// ============================================================================

const getEtapesPreparation = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM etapes_preparation WHERE id = ?";
  
    db.query(query, [id],(err, result) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la récupération de l' étape de préparation" });
      if (!result) return res.status(404).json({ message: "Aucune étape de préparation trouvé" });
      res.status(200).json(result);
    });
  };



// Update etapesPreparation by id
// ============================================================================

const updateEtapesPreparation = (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.cocktail_id) {
    fields.push("cocktail_id = ?");
    values.push(req.body.cocktail_id);
  }
  if (req.body.etape) {
    fields.push("etape = ?");
    values.push(req.body.etape);
  }
  if (req.body.ordre) {
    fields.push("ordre = ?");
    values.push(req.body.ordre);
  }

  if (fields.length === 0)
    return res.status(400).json({ message: "Aucun paramètre soumis pour la mise à jour" });

  values.push(id);
  const query = `UPDATE etapes_preparation SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour de l' étape de préparation" });
    if (!result) return res.status(404).json({ message: "Etape de préparation non trouvé" });
    res.status(200).json({ message: "Etape de préparation mis à jour" });
  });
};



// Delete etapesPreparation by id
// ============================================================================

const deleteEtapesPreparation = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM etapes_preparation WHERE id = ?";
    
    db.query(query, id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression de l' etape de Preparation" });
        if (!result) return res.status(404).json({ message: "Etape de préparation non trouvé" });
        res.status(200).json({ message: "Etape de préparation supprimé" });
    });
};


// Export controller functions
export default {
    createEtapesPreparation,
    getAllEtapesPreparations,
    getEtapesPreparation,
    updateEtapesPreparation,
    deleteEtapesPreparation
};
