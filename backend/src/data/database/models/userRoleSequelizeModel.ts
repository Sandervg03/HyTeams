import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "userroles",
    timestamps: false
})
export default class SequelizeUserRoleModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare role: string;
}