const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.ID_CLIENT);
const googleVerify= async (idToken = '')=> {
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.ID_CLIENT,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const {email,name,picture:img} = ticket.getPayload();
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return {email,name,img};
}
module.exports = {googleVerify};