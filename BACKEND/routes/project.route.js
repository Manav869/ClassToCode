import express from 'express'
import { getAllProjects, getProjectById, getSpecificBusinessProjects, postProject } from '../controllers/project.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js'


const router = express.Router();

router.route("/post").post(postProject);
router.route("/get").get(getAllProjects);
router.route("/get/business/projects").post(getSpecificBusinessProjects);
router.route("/get/:id").get(getProjectById);

export default router;