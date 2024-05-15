import { TeamMember } from "../../business/model/memberModel";
import { Team } from "../../business/model/teamModel";
import SequelizeTeamRoleModel from "../database/models/teamClassSequelizeModel";
import SequelizeTeamModel from "../database/models/teamSequelizeModel"
import SequelizeTeamTypeModel from "../database/models/teamTypeSequelizeModel";
import SequelizeUserTeamModel from "../database/models/userTeamsSequelizeModel";

export class TeamSequelize {

    constructor() { }

    public async getValidTeamTypes(): Promise<string[]> {

        const types: SequelizeTeamTypeModel[] | null = await SequelizeTeamTypeModel.findAll();
        if (types) {
            return types.map((type) => type.type);
        }

        throw new Error("No team types found")
    }

    public async getValidRoleTypes(): Promise<string[]> {

        const types: SequelizeTeamRoleModel[] | null = await SequelizeTeamRoleModel.findAll();
        if (types) {
            return types.map((type) => type.role);
        }

        throw new Error("No role types found")
    }

    public async createTeam(team: Team): Promise<Team> {

        const newTeam: SequelizeTeamModel | null = await SequelizeTeamModel.create({
            name: team.name,
            description: team.description,
            type: team.type,
            leader: team.leader.email
        });
        if (newTeam.name == team.name) {
            const members: TeamMember[] = []
            for (const member of team.members) {
                const teamMember: SequelizeUserTeamModel | null = await SequelizeUserTeamModel.create({
                    useremail: member.email,
                    teamname: team.name,
                    role: member.role
                });
                if (teamMember.useremail && teamMember.teamname) {
                    members.push(new TeamMember(member.username, teamMember.useremail, teamMember.role));
                } else {
                    throw new Error(`Failed to register ${member.username} to team`);
                }
            }
            return new Team(newTeam.name, newTeam.description, newTeam.type, new TeamMember(members[0].username, members[0].email, members[0].role), members);
        } else {
            throw new Error("Failed to create team");
        }
    }
}