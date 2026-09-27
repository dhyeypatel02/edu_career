import { Stream, Track, Degree, Career, StreamId } from '../types/career';
import { STREAMS_DATA } from './streamsData';
import { TRACKS_DATA } from './tracksData';
import { DEGREES_DATA } from './degreesData';
import { CAREERS_DATA } from './careersData';
import { CAREER_EXECUTION_PIPELINES, getCareerExecutionPipeline } from './careerExecutionData';

export { STREAMS_DATA, TRACKS_DATA, DEGREES_DATA, CAREERS_DATA, CAREER_EXECUTION_PIPELINES, getCareerExecutionPipeline };

export function getStreamById(id: StreamId | string): Stream | undefined {
  return STREAMS_DATA.find((s) => s.id === id);
}

export function getTracksByStreamId(streamId: StreamId | string): Track[] {
  return TRACKS_DATA.filter((t) => t.streamId === streamId);
}

export function getTrackById(id: string): Track | undefined {
  return TRACKS_DATA.find((t) => t.id === id);
}

export function getDegreesByTrackId(trackId: string): Degree[] {
  return DEGREES_DATA.filter((d) => d.trackIds.includes(trackId));
}

export function getDegreesByStreamId(streamId: StreamId | string): Degree[] {
  return DEGREES_DATA.filter((d) => d.streamIds.includes(streamId as StreamId));
}

export function getDegreeById(id: string): Degree | undefined {
  return DEGREES_DATA.find((d) => d.id === id);
}

export function getCareersByDegree(degree: Degree): Career[] {
  return CAREERS_DATA.filter(
    (c) => c.primaryDegreeIds.includes(degree.id) || degree.careerIds.includes(c.id)
  );
}

export function getCareersByStreamId(streamId: StreamId | string): Career[] {
  return CAREERS_DATA.filter((c) => c.streamIds.includes(streamId as StreamId));
}

export function getCareerById(id: string): Career | undefined {
  return CAREERS_DATA.find((c) => c.id === id);
}

export interface SearchResultItem {
  type: 'Stream' | 'Track' | 'Degree' | 'Entrance Exam' | 'Career';
  id: string;
  title: string;
  subtitle: string;
  streamId?: StreamId;
  trackId?: string;
  degreeId?: string;
  careerId?: string;
}

export function globalSearch(query: string): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // Search Streams
  for (const s of STREAMS_DATA) {
    if (
      s.title.toLowerCase().includes(q) ||
      s.badge.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.coreSubjects.some((sub) => sub.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'Stream',
        id: s.id,
        title: s.title,
        subtitle: `Class 10 Pathway • ${s.badge}`,
        streamId: s.id,
      });
    }
  }

  // Search Tracks
  for (const t of TRACKS_DATA) {
    if (
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.mandatorySubjects.some((sub) => sub.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'Track',
        id: t.id,
        title: t.title,
        subtitle: `Class 11-12 Track • ${t.category}`,
        streamId: t.streamId,
        trackId: t.id,
      });
    }
  }

  // Search Degrees
  for (const d of DEGREES_DATA) {
    if (
      d.title.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.entranceExams.some(
        (e) => e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q)
      ) ||
      d.majorInstitutions.some((inst) =>
        inst.examples.some((ex) => ex.toLowerCase().includes(q))
      )
    ) {
      results.push({
        type: 'Degree',
        id: d.id,
        title: `${d.code} - ${d.title}`,
        subtitle: `${d.category} • ${d.duration}`,
        streamId: d.streamIds[0],
        degreeId: d.id,
      });
    }
  }

  // Search Careers
  for (const c of CAREERS_DATA) {
    if (
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q) ||
      c.keySkills.some((skill) => skill.toLowerCase().includes(q)) ||
      c.topRecruiters.some((rec) => rec.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'Career',
        id: c.id,
        title: c.title,
        subtitle: `Career Roadmap • ${c.category}`,
        streamId: c.streamIds[0],
        careerId: c.id,
      });
    }
  }

  return results.slice(0, 15);
}
