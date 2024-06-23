import Topic from "@/models/topic";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";

// PUT request handler to update a topic
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    try {
        await connectMongoDB();
        await Topic.findByIdAndUpdate(id, { title, description });
        return NextResponse.json({ message: "Topic updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Topic not updated", error: (error as Error).message }, { status: 500 });
    }
}

// GET request handler to get a specific topic by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connectMongoDB();
        const topic = await Topic.findOne({ _id: id });
        return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Topic not found", error: (error as Error).message }, { status: 500 });
    }
}
