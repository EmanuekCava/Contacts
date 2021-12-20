import { Request, Response } from "express";
import { QueryResult } from "pg";

import { connection } from "../database";

export const contacts = async (req: Request, res: Response): Promise<Response> => {

    let query = `SELECT * FROM contact`;
    
    try {

        const response: QueryResult = await connection.query(query)

        return res.status(200).json({
            contacts: response.rows,
            count: response.rowCount
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const contact = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    let query = `SELECT * FROM contact WHERE id=${id}`;
    
    try {

        const response: QueryResult = await connection.query(query)

        return res.status(200).json(response.rows[0])
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const createContacts = async (req: Request, res: Response): Promise<Response> => {
    
    const { title, phone } = req.body

    try {

        if(!title || !phone) {
            return res.status(400).json({ message: "There are incomplet credentials" })
        }
    
        let query = `INSERT INTO contact(title, phone, created) VALUES ('${title}', ${phone}, NOW())`

        await connection.query(query);

        return res.status(200).json({
            message: 'Contact created',
            data: {
                title,
                phone
            }
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const removeContacts = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    let query = `DELETE FROM contact WHERE id=${id}`;
    
    try {

        await connection.query(query)

        return res.status(200).json({
            message: 'Contact removed'
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const updateContacts = async (req: Request, res: Response)=> {
    
    const { id } = req.params;
    const { title, phone } = req.body;

    try {

        if(!title || !phone) {
            return res.status(400).json({ message: "There are incomplet credentials" })
        }
    
        let query = `UPDATE contact SET title = '${title}', phone = ${phone} WHERE id=${id}`;

        await connection.query(query)

        return res.status(200).json({
            message: "Contact updated",
            data: {
                title,
                phone
            }
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
