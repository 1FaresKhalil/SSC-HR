import { NextResponse } from 'next/server';
import data from '@/data/testimonials.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials data' },
      { status: 500 }
    );
  }
}
