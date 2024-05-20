import { BelongsTo, BelongsToMany, Column, DataType, HasOne, Model, Sequelize, Table } from "sequelize-typescript";
import SequelizeTeamModel from "./teamSequelizeModel";
import SequelizeUserTeamModel from "./userTeamsSequelizeModel";
import SequelizeSessionModel from "./sessionSequelizeModel";

@Table({
    tableName: "users",
    timestamps: true
})
export default class SequelizeUserModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'userroles',
            key: 'role'
        },
        defaultValue: 'user'
    })
    declare role: string;

    @BelongsToMany(() => SequelizeTeamModel, () => SequelizeUserTeamModel)
    declare teams: SequelizeTeamModel[];

    @HasOne(() => SequelizeSessionModel)
    declare session: SequelizeSessionModel;
}