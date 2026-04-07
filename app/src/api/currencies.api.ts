export const getCurrencies = async (role: QueryRole) => {    
  const res = await fetch(`/api/${role}/Currencies`);
 
  return res.json();
};