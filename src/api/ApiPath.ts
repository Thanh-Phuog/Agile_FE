export const ApiPath = {
  // Auth
  LOGIN: getApiPath("auth/login"),
  REGISTER: getApiPath("auth/register"),
  
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/api/${path}`;
} 
