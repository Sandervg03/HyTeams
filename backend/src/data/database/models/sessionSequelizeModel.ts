import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import SequelizeUserModel from "./userSequelizeModel";

@Table({
    tableName: "sessions",
    timestamps: true
})
export default class SequelizeSessionModel extends Model {
    @ForeignKey(() => SequelizeUserModel)
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
        allowNull: false
    })
    declare expires: Date;

    @BelongsTo(() => SequelizeUserModel)
    declare user: SequelizeUserModel;
}