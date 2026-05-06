import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ExamGuide } from '@/lib/models/ExamGuide'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string; sectionKey: string } }
) {
  await connectDB()
  const g = await ExamGuide.findOne({ slug: params.slug, is_active: true }).lean() as any
  if (!g) return NextResponse.json({ examGuide: null, examGuideSection: null }, { status: 404 })

  const section = (g.sections ?? []).find((s: any) => s.section_key === params.sectionKey)
  if (!section) return NextResponse.json({ examGuide: null, examGuideSection: null }, { status: 404 })

  const examGuide = {
    examCode: g.exam_code,
    title: g.title,
    shortTitle: g.short_title,
    level: g.level,
    sections: (g.sections ?? []).map((s: any) => ({
      id: s.section_key,
      title: s.title,
      weight: s.weight,
      objectives: s.objectives,
    })),
  }

  const examGuideSection = {
    id: section.section_key,
    title: section.title,
    description: section.description,
    weight: section.weight,
    objectives: section.objectives,
    lessons: (section.lessons ?? []).map((l: any) => ({
      id: String(l._id),
      objectiveIndex: l.objective_index,
      title: l.title,
      slug: l.slug,
      content: l.content,
      sortOrder: l.sort_order,
    })),
  }

  return NextResponse.json({ examGuide, examGuideSection })
}
