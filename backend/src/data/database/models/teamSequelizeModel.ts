import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Team } from "../../../business/model/teamModel";
import SequelizeUserModel from "./userSequelizeModel";
import SequelizeUserTeamModel from "./userTeamsSequelizeModel";

@Table({
    tableName: "team",
    timestamps: false
})
export default class SequelizeTeamModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false
    })
    declare description: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'teamtype',
            key: 'type'
        }
    })
    declare type: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'users',
            key: 'email'
        }
    })
    declare leader: string;

    @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserTeamModel)
    declare members: SequelizeUserModel[];

}