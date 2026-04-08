export const getAuthors = async (role: QueryRole) => {    
  const res = await fetch(`/api/${role}/Authors`);
 
  return res.json();
};