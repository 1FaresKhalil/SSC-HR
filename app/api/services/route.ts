import { NextResponse } from 'next/server';
import data from '@/data/services.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services data' },
      { status: 500 }
    );
  }
}
