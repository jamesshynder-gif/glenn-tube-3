import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: `Suggest a catchy video title and a one-line description for: ${prompt}`
  });

  return NextResponse.json({ suggestion: result.output_text });
}
