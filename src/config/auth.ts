export default {
  jwt: {
    secret: process.env.APP_SECRET || 'any_key',
    expiresIn: '3d',
  },
};
