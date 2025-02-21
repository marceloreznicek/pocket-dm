// app/api/campaigns/[campaign_id]/messages/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { MessageService } from '@/lib/services/messages';
import { DM_SYSTEM_PROMPT, WILD_SHEEP_CHASE_PROMPT } from '@/lib/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const AI_USER_ID = 1;  // Our AI DM's ID from the database

export async function POST(
  request: Request,
  { params }: { params: { campaign_id: string } }
) {
  try {
    const campaignId = params.campaign_id;
    const { content, sender_id } = await request.json();
    
    // Save player message
    const playerMessage = await MessageService.create({
      campaign_id: campaignId,
      sender_id,
      content,
      message_type: 'player',
      metadata: null
    });

    // Get recent messages for context
    const recentMessages = await MessageService.getForCampaign({
      campaign_id: campaignId,
      limit: 10
    });

    // Format messages for OpenAI
    const openAiMessages = [
      DM_SYSTEM_PROMPT,
      WILD_SHEEP_CHASE_PROMPT,
      ...recentMessages.map(msg => ({
        role: msg.sender_id === AI_USER_ID ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content }
    ];

    // Get AI response
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openAiMessages,
      temperature: 0.7,
    });

    // Save AI response
    const aiMessage = await MessageService.create({
      campaign_id: campaignId,
      sender_id: AI_USER_ID,
      content: aiResponse.choices[0].message.content,
      message_type: 'dm',
      metadata: {
        model: "gpt-3.5-turbo",
        timestamp: new Date()
      }
    });

    return NextResponse.json(aiMessage);
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { campaign_id: string } }
) {
  try {
    const messages = await MessageService.getForCampaign({
      campaign_id: params.campaign_id,
      limit: 50
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}