export const getCurrentAuthority = ():Array<string> => ["admin"];

export const check = (authority:Array<string>) :boolean => {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
};

export const isLogin = (): any => {
  const current = getCurrentAuthority();
  return current && current[0] != "guest";
};
