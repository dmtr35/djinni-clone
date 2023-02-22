import VacancyService from "../services/vacancy.js";

class Vacancy {
  async getByUser(req, res) {
    try {
      const userId = req.user._id;
      const vacancies = await VacancyService.getByFitler({
        creator: userId,
      });
      res.json(vacancies);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async getByFitler(req, res) {
    try {
      const filter = req.body || {};
      const user = req.user
      const vacancies = await VacancyService.getByFitler(filter, user);
      res.json(vacancies);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async getById(req, res) {
    try {
      const vacancyId = req.params.id;
      const candidate = req.user
      const vacancy = await VacancyService.getById(vacancyId, candidate);
      res.json(vacancy);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async create(req, res) {
    try {
      const {
        name,
        detailedDescription,
        salaryRange = null,
        specialty,
        experience,
        shortDescription,
      } = req.body;

      const creator = req.user._id;

      const newVacancy = await VacancyService.create({
        name,
        salaryRange,
        creator,
        specialty,
        experience,
        shortDescription,
        detailedDescription,
      });

      res.json(newVacancy);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const payload = req.body;
      const updated = await VacancyService.update(payload);
      res.json(updated);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }

  async apply(req, res) {
    try {
      const cv = req.file;
      const { coverLetter = "" } = req.body
      const { vacancyId } = req.params;
      const { user } = req;

      await VacancyService.apply(vacancyId, user._id, cv, coverLetter);

      res.sendStatus(200);
    } catch (e) {
      res.status(e.status).json(e.message);
      console.log(e);
    }
  }


  async searchByKeyword(req, res) {
    try {
      const searchTerm = req.params.searchTerm;
      const vacancies = await VacancyService.search({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { shortDescription: { $regex: searchTerm, $options: 'i' } },
          { detailedDescription: { $regex: searchTerm, $options: 'i' } }
        ]
      });
  
      if (vacancies.length === 0) {
        res.status(404).json({ error: 'No vacancies found' });
        return;
      }
  
      res.json(vacancies);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new Vacancy();
