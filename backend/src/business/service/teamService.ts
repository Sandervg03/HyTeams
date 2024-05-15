import { TeamSequelize } from "../../data/sequelize/teamSequelize"
import { Team } from "../model/teamModel";

export class TeamService {

    constructor(private data: TeamSequelize) { }

    public async getValidTeamTypes(): Promise<string[]> {

        return await this.data.getValidTeamTypes();
    }

    public async getValidRoleTypes(): Promise<string[]> {

        return await this.data.getValidRoleTypes();
    }

    public async createTeam(team: Team): Promise<Team> {
        
        if ((await this.getValidTeamTypes()).includes(team.type)) {
            return await this.data.createTeam(team);
        }
        throw new Error("Invalid team type");
    }
}