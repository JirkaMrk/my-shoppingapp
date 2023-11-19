import { v4 as uuidv4 } from 'uuid';

const UniqueIdGenerator = () => {
  const generateUniqueId = () => {
    return uuidv4();
  };

  return {
    generateUniqueId,
  };
};

export default UniqueIdGenerator;
