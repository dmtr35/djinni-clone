import { BadRequest } from "../common/errors.js";
import CompanyService from "../services/company.js";

class Company {
  async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequest("BAD REQUEST");
      }
      const company = await CompanyService.getById(id);
      res.json(company);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const payload = req.body;
      const avatar = req.file
      const path = avatar?.path.split('/').slice(1).join('/');

      const updated = await CompanyService.update(id, {...payload, avatar: path});
      res.json(updated);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }
}

export default new Company();
