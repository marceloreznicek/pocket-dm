// app/api/campaigns/[campaign_id]/messages/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { MessageService } from "@/lib/services/messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AI_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function GET(
  request: Request,
  context: { params: { campaign_id: string } }
) {
  try {
    const campaignId = await context.params.campaign_id;

    const messages = await MessageService.getForCampaign({
      campaign_id: campaignId,
      limit: 50,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: { campaign_id: string } }
) {
  try {
    const campaignId = context.params.campaign_id;
    const { content, sender_id } = await request.json();

    const playerMessage = await MessageService.create({
      campaign_id: campaignId,
      sender_id,
      content,
      message_type: "player",
      metadata: null,
    });

    // Get recent messages for context
    const recentMessages = await MessageService.getForCampaign({
      campaign_id: params.campaign_id,
      limit: 10,
    });

    // Format for OpenAI
    const openAiMessages = recentMessages.map((msg) => ({
      role: msg.sender_id === AI_USER_ID ? "assistant" : "user",
      content: msg.content,
    }));

    // Get AI response
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...openAiMessages, { role: "user", content }],
    });

    // Save AI response
    const aiMessage = await MessageService.create({
      campaign_id: params.campaign_id,
      sender_id: AI_USER_ID,
      content: aiResponse.choices[0].message.content,
      message_type: "dm",
      metadata: {
        model: "gpt-3.5-turbo",
        timestamp: new Date(),
      },
    });

    return NextResponse.json(aiMessage);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
