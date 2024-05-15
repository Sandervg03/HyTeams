import { TeamMember } from "../business/model/memberModel";
import { Team } from "../business/model/teamModel";
import { TeamService } from "../business/service/teamService";
import express from "express";
import { UserSequelize } from "../data/sequelize/userSequelize";
import { User } from "../business/model/userModel";

export class TeamController {

    constructor(private service: TeamService, private userData: UserSequelize = new UserSequelize()) { }

    public async createTeam(req: express.Request, res: express.Response) {
        try {
            const memberPromises = req.body._members.map(async (member: { _username: string, _role: string }) => {
                const user = await this.userData.findUserByUsername(member._username);
                return new TeamMember(member._username, user.email, member._role);
            });
            const members: TeamMember[] = await Promise.all(memberPromises);
            const leader: User = await this.userData.findUserBySessionId(req.cookies.sessionId);
            members.push(new TeamMember(leader.username, leader.email, req.body._leaderRole));
            res.status(201).json(this.service.createTeam(
                new Team(
                    req.body._name,
                    req.body._description,
                    req.body._type,
                    new TeamMember(leader.username, leader.email, req.body._leaderRole),
                    members
                )))
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }
}