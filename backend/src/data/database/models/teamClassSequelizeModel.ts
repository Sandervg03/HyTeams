import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "teamroles",
    timestamps: false
})
export default class SequelizeTeamRoleModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare role: string;
}