import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "teamtype",
    timestamps: false
})
export default class SequelizeTeamTypeModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare type: string;
}