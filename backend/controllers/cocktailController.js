import { db } from "../config/db.js";



// Create a new cocktail
// ============================================================================

const createCocktail = async (req, res) => {
  const { nom, description, verre, garniture, alcoolise } = req.body;

  if (!nom || !description || !verre || !garniture || !alcoolise)
    return res.status(400).json({ message: "Veuillez remplir tous les champs" });

  const query = "INSERT INTO cocktails (nom, description, verre, garniture, alcoolise) VALUES (?, ?, ?, ?, ?)";

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(query, [nom, description, verre, garniture, alcoolise]);
    connection.release();
    res.status(201).json({ message: "cocktail créé" });
  } catch (err) {
    console.error("Erreur lors de la création du cocktail :", err);
    res.status(500).json({ message: "Erreur lors de la création du cocktail" });
  }
};



// Insert a new cocktail
// ============================================================================

export const insertCocktail = async (req, res) => {
  const { nom, description, verre, garniture, alcoolise, ingredients, categories, etapes } = req.body;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insérer le cocktail
    const [cocktailRes] = await connection.query(
      `INSERT INTO cocktails (nom, description, verre, garniture, alcoolise) VALUES (?, ?, ?, ?, ?)`,
      [nom, description, verre, garniture, alcoolise]
    );
    const cocktailId = cocktailRes.insertId;

    // Insérer les ingrédients et les lier au cocktail
    for (const ing of ingredients) {
      let ingredientId = ing.id;
      if (!ingredientId) {
        const [ingredientRes] = await connection.query(
          `INSERT INTO ingredients (nom) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
          [ing.nom]
        );
        ingredientId = ingredientRes.insertId;
      }
      await connection.query(
        `INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantite) VALUES (?, ?, ?)`,
        [cocktailId, ingredientId, ing.quantite]
      );
    }

    // Insérer les catégories et les lier au cocktail
    for (const cat of categories) {
      let categoryId = cat.id;

      if (!categoryId) {
        const [categoryRes] = await connection.query(
          `INSERT INTO categories (nom) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
          [cat.nom]
        );
        categoryId = categoryRes.insertId;
      }

      await connection.query(
        `INSERT INTO cocktail_categories (cocktail_id, categorie_id) VALUES (?, ?)`,
        [cocktailId, categoryId]
      );
    }

    // Insérer les étapes de préparation
    for (const { etape, ordre } of etapes) {
      await connection.query(
        `INSERT INTO etapes_preparation (cocktail_id, etape, ordre) VALUES (?, ?, ?)`,
        [cocktailId, etape, ordre]
      );
    }

    await connection.commit();
    connection.release();
    res.status(201).json({ success: true, message: "Cocktail ajouté avec succès", cocktailId });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Erreur lors de l’insertion du cocktail :", error);
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
};



// Get all cocktails
// ============================================================================

const getAllCocktails = async (req, res) => {
  const query = 'SELECT * FROM vue_cocktails';

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(query);
    connection.release();
    if (!result.length) return res.status(404).json({ message: "Aucun cocktail trouvé" });
    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur lors de la récupération des cocktails :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des cocktails" });
  }
};



// Get 1 cocktail
// ============================================================================

const getCocktail = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM vue_cocktails WHERE id = ?';

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(query, [id]);
    connection.release();
    if (!result.length) return res.status(404).json({ message: "Aucun cocktail trouvé" });
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Erreur lors de la récupération du cocktail :", err);
    res.status(500).json({ message: "Erreur lors de la récupération du cocktail" });
  }
};



// Update cocktail by id
// ============================================================================

const updateCocktail = async (req, res) => {
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

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(query, values);
    connection.release();
    if (!result.affectedRows) return res.status(404).json({ message: "Cocktail non trouvé" });
    res.status(200).json({ message: "Cocktail mis à jour" });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du cocktail :", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du cocktail" });
  }
};



// Delete cocktail by id
// ============================================================================

const deleteCocktail = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM cocktails WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(query, [id]);
    connection.release();
    if (!result.affectedRows) return res.status(404).json({ message: "Cocktail non trouvé" });
    res.status(200).json({ message: "Cocktail supprimé" });
  } catch (err) {
    console.error("Erreur lors de la suppression du cocktail :", err);
    res.status(500).json({ message: "Erreur lors de la suppression du cocktail" });
  }
};



// Export controller functions
export default {
  createCocktail,
  insertCocktail,
  getAllCocktails,
  getCocktail,
  updateCocktail,
  deleteCocktail
};
