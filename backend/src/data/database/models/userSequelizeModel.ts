import { Column, DataType, Model, Table } from "sequelize-typescript";

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
        primaryKey: false
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
}