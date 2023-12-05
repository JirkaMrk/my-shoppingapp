const Ajv = require('ajv'); 
const ajv = new Ajv();  // instance ajv

function validate(schema) { // funkce pro validaci
  return (req, res, next) => { // vrátí validní požadavek
    const valid = ajv.validate(schema, req.body);
    if (!valid) { // pokud je validace neúspěšná
      return res.status(400).json({ error: ajv.errorsText() }); // vrátí chybu
    }
    next();
  };
}

module.exports = validate;

