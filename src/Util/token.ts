export const getDuration = () => {
  const expirationString = localStorage.getItem("expiration");
  if (expirationString) {
    const expirationDate = new Date(expirationString);
    const current = new Date();
    const duration = expirationDate.getTime() - current.getTime();
    return duration;
  } else {
    return null;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const duration = getDuration();
    if (duration && duration <= 0) {
      return "token expired";
    }
    return token;
  }
  return null;
};
