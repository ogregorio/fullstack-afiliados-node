const getSuccessResponse = (user: string) => {
  return {
    expiresIn: new Date(),
    token: 'eyJhbGciOiJIUzI1NiTQ',
    name: user,
  };
};

export { getSuccessResponse };
