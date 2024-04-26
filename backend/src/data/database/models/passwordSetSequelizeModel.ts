import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "passwordscode",
    timestamps: true
})
export default class SequelizePasswordCodeModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare code: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "users",
            key: "email"
        }
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false,
    })
    declare status: string;
}