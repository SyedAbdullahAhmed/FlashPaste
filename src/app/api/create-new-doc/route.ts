
import { NextResponse } from "next/server";
import TextDocument from "@/app/models/file";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "@/app/connection/db";


export async function POST() {
  try {
    await connect();


    const count = await TextDocument.countDocuments();
    if (count >= 30) {
       await TextDocument.findOneAndDelete({}, { sort: { createdAt: 1 } });
    };
      

    const newDoc = await TextDocument.create({
      path: uuidv4()
    });

    if(!newDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not created",
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
        message: "Document created successfully!",
        data: newDoc
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Some error occur while document creation:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Some error occur while document creation",
        data: null
      },
      {
        status: 400,
      }
    );
  }
}