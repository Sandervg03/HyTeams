import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "sessions",
    timestamps: true
})
export default class SequelizeSessionModel extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'email'
        }
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare sessionid: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        primaryKey: false,
        defaultValue: new Date(Date.now() + 31536000000) // 1 year
    })
    declare expires: Date
}