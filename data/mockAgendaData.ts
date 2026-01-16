import { AgendaSection } from '@/types/calendar';

export const MOCK_AGENDA_ITEMS: AgendaSection[] = [
  {
    title: '2026-01-15',
    data: [
      { hour: '9:00 AM', title: 'Team Meeting', duration: '1h' },
      { hour: '2:00 PM', title: 'Project Review', duration: '30min' }
    ]
  },
  {
    title: '2026-01-16',
    data: [
      { hour: '10:00 AM', title: 'Client Call', duration: '45min' },
      { hour: '3:00 PM', title: 'Design Sprint', duration: '2h' }
    ]
  },
  {
    title: '2026-01-17',
    data: [
      { hour: '11:00 AM', title: 'Lunch with Sarah', duration: '1h' }
    ]
  },
  {
    title: '2026-01-18',
    data: []
  },
  {
    title: '2026-01-19',
    data: [
      { hour: '9:30 AM', title: 'Standup', duration: '15min' },
      { hour: '1:00 PM', title: 'Code Review', duration: '1h' },
      { hour: '4:00 PM', title: 'Team Sync', duration: '30min' }
    ]
  },
  {
    title: '2026-01-20',
    data: [
      { hour: '10:00 AM', title: 'Workshop', duration: '3h' }
    ]
  },
];

export const MOCK_MARKED_DATES = {
  '2026-01-15': { marked: true },
  '2026-01-16': { marked: true },
  '2026-01-17': { marked: true },
  '2026-01-19': { marked: true },
  '2026-01-20': { marked: true },
};