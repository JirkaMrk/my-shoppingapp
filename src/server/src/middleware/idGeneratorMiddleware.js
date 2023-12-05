const { v4: uuidv4 } = require('uuid'); 

const UniqueIdGenerator = () => {
  // funkce pro generování unikátního id
  const generateUniqueId = () => {
    return uuidv4();
  };

  return {
    generateUniqueId, // vrátí unikátní id
  };
};

module.exports = UniqueIdGenerator;