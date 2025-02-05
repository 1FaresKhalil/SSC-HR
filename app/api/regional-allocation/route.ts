import { NextResponse } from 'next/server';
import data from '@/data/regional-allocation.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch regional allocation data' },
      { status: 500 }
    );
  }
}
