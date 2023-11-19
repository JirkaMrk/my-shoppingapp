import { v4 as uuidv4 } from 'uuid';

const UniqueIdGenerator = () => { // funkce pro generování unikátního "_id"
  const generateUniqueId = () => {
    return uuidv4();
  };

  return {
    generateUniqueId,
  };
};

export default UniqueIdGenerator;
