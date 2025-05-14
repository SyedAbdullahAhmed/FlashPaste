
import { NextResponse } from "next/server";
import TextDocument from "@/app/models/file";
import { connect } from "@/app/connection/db";
import mongoose from 'mongoose';


export async function PUT(req: Request) {
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
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Text is required",
                    data: null
                },
                {
                    status: 400,
                }
            );
        }

        if (text.length > 5000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Text must not exceed 500 words.",
                    data: null
                },
                {
                    status: 400,
                }
            );
        }

        
        const updatedDoc = await TextDocument.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: { text } },
            { new: true }
        );

        
        if (!updatedDoc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document not updated",
                    data: null
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Document updated successfully!",
                // data: updatedDoc
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Some error occur while updating document:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Some error occur while updating document",
                data: null
            },
            {
                status: 400,
            }
        );
    }
}