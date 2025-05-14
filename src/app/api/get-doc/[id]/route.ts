
import { NextResponse } from "next/server";
import TextDocument from "@/app/models/file";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "@/app/connection/db";


export async function GET(req: Request, res: Response) {
    try {
        await connect();

        const id = req?.url?.split('/')[5];

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID is required",
                    data: null
                },
                {
                    status: 400,
                }
            );
        }

        const doc = await TextDocument.findOne({ path: id });
        if (!doc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document not found",
                    data: null
                },
                {
                    status: 404,
                }
            );
        }

        if (!doc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document not found",
                    data: null
                },
                {
                    status: 404,
                }
            );
        }



        return NextResponse.json(
            {
                success: true,
                message: "Document found successfully!",
                data: doc.text
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error creating Link:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating Link",
                data: null
            },
            {
                status: 400,
            }
        );
    }
}