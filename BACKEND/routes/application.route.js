import express from 'express'
import { applyProject, getApplicants, getAppliedProjects, updateStatus } from '../controllers/application.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router();

router.route("/apply/:id").post(applyProject);
router.route("/:id/get").get(getApplicants);
router.route("/get/projects").post(getAppliedProjects);
router.route("/status/:id/update").post(updateStatus);

export default router;