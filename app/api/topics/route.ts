import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { title, description } = await request.json();
    try {
        await connectMongoDB();
        await Topic.create({ title, description });
        return NextResponse.json({ message: "Topic created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Topic not created", error: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }
    try {
        await connectMongoDB();
        await Topic.findByIdAndDelete(id);
        return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Topic not deleted", error: (error as Error).message }, { status: 500 });
    }
}
