import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, Sequelize, DataType } from 'sequelize-typescript';
import SequelizeUserModel from './userSequelizeModel';
import SequelizeTeamModel from './teamSequelizeModel';


@Table({
    tableName: "userteam",
    timestamps: true
})
export default class SequelizeUserTeamModel extends Model {
    @PrimaryKey
    @ForeignKey(() => SequelizeUserModel)
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.STRING
    })
    declare useremail: string;

    @BelongsTo(() => SequelizeUserModel)
    declare user: SequelizeUserModel;

    @PrimaryKey
    @ForeignKey(() => SequelizeTeamModel)
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.STRING
    })
    declare teamname: string;

    @BelongsTo(() => SequelizeTeamModel)
    declare team: SequelizeTeamModel;

    @Column({
        primaryKey: false,
        allowNull: false,
        type: DataType.STRING,
        references: {
            model: 'teamroles',
            key: 'role'
        }
    })
    declare role: string;
}