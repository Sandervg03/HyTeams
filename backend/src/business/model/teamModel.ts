import { TeamSequelize } from "../../data/sequelize/teamSequelize";
import { TeamService } from "../service/teamService";
import { TeamMember } from "./memberModel";

export class Team {

    private _name!: string;
    private _description!: string;
    private _type!: string;
    private _leader!: TeamMember;
    private _members!: TeamMember[];
    private service: TeamService = new TeamService(new TeamSequelize());

    constructor(
        name: string,
        description: string,
        type: string,
        leader: TeamMember,
        members: TeamMember[]
    ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.leader = leader;
        this.members = members;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get type(): string {
        return this._type;
    }

    public get leader(): TeamMember {
        return this._leader;
    }

    public get members(): TeamMember[] {
        return this._members;
    }

    public set name(name: string) {
        if (name) {
            if (name.length > 2) {
                if (name.length < 12) {
                    this._name = name;
                } else {
                    throw new Error("Name must be less than 12 characters");
                }
            } else {
                throw new Error("Name must be more than 2 characters");
            }
        } else {
            throw new Error('Name is required');
        }
    }

    public set description(description: string) {
        if (description) {
            if (description.length > 2) {
                if (description.length < 101) {
                    this._description = description;
                } else {
                    throw new Error("Description must be less than 101 characters");
                }
            } else {
                throw new Error("Description must be more than 2 characters");
            }
        } else {
            throw new Error('Description is required');
        }
    }

    public set type(type: string) {
        if (type) {
            this._type = type;
        }
    }

    public set leader(leader: TeamMember) {
        if (leader) {
            if (leader instanceof TeamMember) {
                this._leader = leader;
            } else {
                throw new Error('Leader must be a User');
            }
        } else {
            throw new Error('Leader is required');
        }
    }

    public set members(members: TeamMember[]) {
        if (members) {
            if (members.length > 0) {
                if (members.length < 6) {
                    for (let member of members) {
                        if (!(member instanceof TeamMember)) {
                            throw new Error('Members must be Users');
                        }
                    }
                    this._members = members;
                } else {
                    throw new Error('Members must be less than 6');
                }
            } else {
                throw new Error('Members must be at least one User');
            }
        } else {
            throw new Error('Members are required');
        }
    }
}