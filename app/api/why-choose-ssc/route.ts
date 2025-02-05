import { NextResponse } from 'next/server';
import data from '@/data/why-choose-ssc.json';

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch why-choose-ssc data' },
      { status: 500 }
    );
  }
}
