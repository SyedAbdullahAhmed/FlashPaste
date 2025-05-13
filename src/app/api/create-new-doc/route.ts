
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    try {

        const { name, text } = await req.json();

        if (!name || !text) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all fields",
                    data: null
                },
                {
                    status: 400,
                }
            );
        }

        if(text.length > 500) {
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

        return NextResponse.json(
            {
                success: true,
                message: "email send successfully!",
                data: r
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Some error occur whhile senidnmail:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Some error occur whhile senidnmail",
                data: null
            },
            {
                status: 400,
            }
        );
    }
}