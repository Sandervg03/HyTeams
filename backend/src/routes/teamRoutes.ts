import express from "express";
const app = express();

import { Authentication } from "../middleware/authentication";
const authentication: Authentication = new Authentication();

import { TeamController } from "../controller/teamController";
import { TeamService } from "../business/service/teamService";
import { TeamSequelize } from "../data/sequelize/teamSequelize";
const teamSequelize: TeamSequelize = new TeamSequelize();
const teamService: TeamService = new TeamService(teamSequelize);
const teamController: TeamController = new TeamController(teamService);

app.get("/team/types", authentication.isLoggedIn, (req: express.Request, res: express.Response) => {
    teamController.getValidTeamTypes(req, res);
});

app.get("/team/roles", authentication.isLoggedIn, (req: express.Request, res: express.Response) => {
    teamController.getValidRoleTypes(req, res);
});

app.post("/team", authentication.isLoggedIn, (req: express.Request, res: express.Response) => {
    teamController.createTeam(req, res);
});

module.exports = app;