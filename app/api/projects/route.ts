import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';

export function GET() {
  return NextResponse.json(getProjects());
}
