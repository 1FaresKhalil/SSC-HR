import { NextResponse } from 'next/server';
import data from '@/data/our-story.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch our-story data' },
      { status: 500 }
    );
  }
}
