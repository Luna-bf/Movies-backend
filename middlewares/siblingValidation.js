// suppression de l'import non utlisé

export const siblingCreation = (req, res, next) => {
    const { name, last_name, age, birthDate } = req.body;

    // bien mettre if différent de, car avant on avait un if avec && qui ne fonctionnait pas
    if (!name || !last_name || !age || !birthDate) {
        // si un des champs est vide, on renvoie un message d'erreur, status 400
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};
