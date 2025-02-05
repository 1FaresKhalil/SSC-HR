import { NextResponse } from 'next/server';
import data from '@/data/nav-hero.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch nav-hero data' },
      { status: 500 }
    );
  }
}
