import { TeamSequelize } from "../../data/sequelize/teamSequelize";
import { TeamService } from "../service/teamService";
import { User } from "./userModel";

export class TeamMember extends User {

    private _role!: string;
    private service: TeamService = new TeamService(new TeamSequelize());

    constructor(username: string, email: string, role: string) {
        super(username, email);
        this.setRole(role);
    }

    public get role(): string {
        return this._role;
    }

    public async setRole(role: string) {
        if (role) {
            if ((await this.service.getValidRoleTypes()).includes(role)) {
                this._role = role;
            }
        } else {
            throw new Error('Role is required');
        }
    }

}