import AuthService from "../services/auth.js";

class Auth {
  async registation(req, res) {
    try {
      const { email, password, role, username } = req.body;
      const avatar = req.file;
      const path = avatar?.path.split('/').slice(1).join('/');

      const token = await AuthService.registration({
        username,
        email,
        password,
        role,
        avatar: path,
      });

      res.json(token);
    } catch (e) {
      res.status(e.status).json(e);
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      res.json(token);
    } catch (e) {
      res.status(e.status).json(e);
      console.log(e);
    }
  }
}

export default new Auth();
