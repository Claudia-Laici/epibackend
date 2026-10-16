const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const fieldLabels = {
      title: "il titolo",
      category: "la categoria",
      content: "il contenuto",
      "readTime.value": "il tempo di lettura",
      "readTime.unit": "l'unità del tempo di lettura",
    };

    const messages = Object.values(err.errors).map((error) => {
      const field = fieldLabels[error.path] || error.path;

      if (error.kind === "required") {
        return `Inserisci ${field}.`;
      }

      if (error.kind === "enum") {
        return `Seleziona un valore valido per ${field}.`;
      }

      return `Controlla il campo ${field}.`;
    });

    return res.status(400).json({
      statusCode: 400,
      message: messages.join(" "),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      statusCode: 400,
      message: "ID o valore non valido",
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];

    const messages = {
      email: "Questa email è già registrata",
      googleId: "Questo account Google è già collegato",
    };

    return res.status(409).json({
      statusCode: 409,
      message: messages[field] || "Valore già presente",
    });
  }

  return res.status(500).json({
    statusCode: 500,
    message: "Si è verificato un errore del server. Riprova più tardi.",
  });
};

export default errorHandler;
