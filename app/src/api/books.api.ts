export const getBooks = async (role: QueryRole) => {    
  const res = await fetch(`/api/${role}/Books`);
 
  return res.json();
};