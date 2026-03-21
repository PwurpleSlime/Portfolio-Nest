import { Injectable, OnModuleInit } from '@nestjs/common';
import Database from "better-sqlite3"
import { addItemDTO } from './dto/addItem.dto';

@Injectable()
export class SqliteTaskManagerService{
    db: Database.Database
    constructor(){
        this.db = new Database('tmp/sqlite-task-manager.db')
    }

    startDatabase() {
        const query = `
            CREATE TABLE IF NOT EXISTS todo(
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL UNIQUE,
                description TEXT,
                completed INTEGER NOT NULL,
                createdDate TEXT
            )
        `
        this.db.exec(query)
        return 'Ran db creation exec'
    }

    addItem(input: addItemDTO) {
        const query = `
            INSERT INTO todo (title, description, completed, createdDate)
            VALUES (?, ?, 0, datetime('now'))
        `
        return this.db.prepare(query).run(input.title, input.description ?? null)
    }

    getAllItems() {
        const query = `SELECT * FROM todo`
        const rows = this.db.prepare(query).all() 
        return rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            completed: Boolean(row.completed),
            createdDate: row.createdDate
        }))
    }

    toggleCompleted(id: number) {
        const query = `
            UPDATE todo
            SET completed = NOT completed
            WHERE id = ?
        `
        return this.db.prepare(query).run(id)
    }

    deleteTodoItem(id: number) {
        const query = `
            DELETE FROM todo
            WHERE id = ?
        `
        return this.db.prepare(query).run(id)
    }
}
//         name STRING NOT NULL,
//         username STRING NOT NULL UNIQUE
