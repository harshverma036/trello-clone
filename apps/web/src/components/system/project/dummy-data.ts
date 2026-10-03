import type { CardMember, ProjectTask } from "@/components/system/project/project-task"

export type ProjectStatus = {
  id: string
  title: string
  taskCount: number
  sequence: number
  tasks: ProjectTask[]
}

const DAY_MS = 24 * 60 * 60 * 1000

// Dates relative to now, so the dummy data never looks stale
const daysAgo = (days: number) =>
  new Date(Date.now() - days * DAY_MS).toISOString()

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`

// Some members have no avatarUrl, to show the initials fallback
export const MEMBERS = {
  riya: { id: "u-riya", name: "Riya Sharma", avatarUrl: avatar("Riya") },
  aman: { id: "u-aman", name: "Aman Gupta" },
  neha: { id: "u-neha", name: "Neha Singh", avatarUrl: avatar("Neha") },
  karan: { id: "u-karan", name: "Karan Mehta" },
  priya: { id: "u-priya", name: "Priya Nair", avatarUrl: avatar("Priya") },
  vikram: { id: "u-vikram", name: "Vikram Rao" },
} satisfies Record<string, CardMember>

export const dummyProjectStatusData: ProjectStatus[] = [
  {
    id: "1",
    title: "In Progress",
    taskCount: 5,
    sequence: 1,
    tasks: [
      {
        id: "task-1",
        sequence: 1,
        name: "Design the onboarding flow",
        members: [MEMBERS.riya],
        attachmentsCount: 1,
        commentsCount: 3,
        completedTaskCount: 2,
        totalTaskCount: 5,
        createdAt: daysAgo(6),
      },
      {
        id: "task-2",
        sequence: 2,
        name: "Build card detail modal",
        members: [MEMBERS.neha, MEMBERS.aman],
        attachmentsCount: 0,
        commentsCount: 0,
        completedTaskCount: 4,
        totalTaskCount: 9,
        createdAt: daysAgo(4),
      },
      {
        id: "task-3",
        sequence: 3,
        name: "Drag and drop cards between lists",
        // 5 members → shows 3 avatars + "+2"
        members: [
          MEMBERS.riya,
          MEMBERS.aman,
          MEMBERS.neha,
          MEMBERS.karan,
          MEMBERS.priya,
        ],
        attachmentsCount: 2,
        commentsCount: 8,
        completedTaskCount: 1,
        totalTaskCount: 6,
        createdAt: daysAgo(9),
      },
      {
        id: "task-4",
        sequence: 4,
        name: "Set up Postgres schema for boards, lists and cards",
        members: [MEMBERS.aman],
        attachmentsCount: 0,
        commentsCount: 1,
        completedTaskCount: 0,
        totalTaskCount: 6,
        createdAt: daysAgo(2),
      },
      {
        id: "task-5",
        sequence: 5,
        name: "Fix login redirect loop on Safari",
        members: [MEMBERS.karan, MEMBERS.riya],
        attachmentsCount: 2,
        commentsCount: 5,
        completedTaskCount: 0,
        totalTaskCount: 0, // no subtasks → task badge hidden
        createdAt: daysAgo(1),
      },
    ],
  },
  {
    id: "2",
    title: "Development",
    taskCount: 3,
    sequence: 2,
    tasks: [
      {
        id: "task-6",
        sequence: 1,
        name: "Rate-limit public API endpoints",
        members: [MEMBERS.vikram],
        attachmentsCount: 0,
        commentsCount: 0,
        completedTaskCount: 1,
        totalTaskCount: 3,
        createdAt: daysAgo(5),
      },
      {
        id: "task-7",
        sequence: 2,
        name: "Board sharing and invite links",
        members: [MEMBERS.priya, MEMBERS.vikram],
        attachmentsCount: 1,
        commentsCount: 4,
        completedTaskCount: 3,
        totalTaskCount: 7,
        createdAt: daysAgo(12),
      },
      {
        id: "task-8",
        sequence: 3,
        name: "Write copy for empty states",
        members: [], // unassigned → no avatars
        attachmentsCount: 0,
        commentsCount: 0,
        completedTaskCount: 0,
        totalTaskCount: 0,
        createdAt: daysAgo(0.2),
      },
    ],
  },
  {
    id: "3",
    title: "Testing",
    taskCount: 8,
    sequence: 3,
    tasks: [
      {
        id: "task-9",
        sequence: 1,
        name: "Dark mode color audit",
        members: [MEMBERS.neha],
        attachmentsCount: 6,
        commentsCount: 2,
        completedTaskCount: 3,
        totalTaskCount: 4,
        createdAt: daysAgo(15),
      },
      {
        id: "task-10",
        sequence: 2,
        name: "E2E tests for card create, edit and delete",
        members: [MEMBERS.karan],
        attachmentsCount: 0,
        commentsCount: 2,
        completedTaskCount: 7,
        totalTaskCount: 7, // all done → green badge
        createdAt: daysAgo(8),
      },
      {
        id: "task-11",
        sequence: 3,
        name: "Load test the board API",
        members: [MEMBERS.vikram],
        attachmentsCount: 1,
        commentsCount: 0,
        completedTaskCount: 2,
        totalTaskCount: 5,
        createdAt: daysAgo(3),
      },
      {
        id: "task-12",
        sequence: 4,
        name: "Verify email notifications for mentions",
        members: [MEMBERS.priya],
        attachmentsCount: 0,
        commentsCount: 1,
        completedTaskCount: 0,
        totalTaskCount: 0,
        createdAt: daysAgo(2),
      },
      {
        id: "task-13",
        sequence: 5,
        name: "Cross-browser check on Safari and Firefox",
        members: [MEMBERS.riya, MEMBERS.neha],
        attachmentsCount: 4,
        commentsCount: 3,
        completedTaskCount: 5,
        totalTaskCount: 8,
        createdAt: daysAgo(7),
      },
      {
        id: "task-14",
        sequence: 6,
        name: "Mobile layout for board view",
        members: [MEMBERS.aman],
        attachmentsCount: 3,
        commentsCount: 0,
        completedTaskCount: 6,
        totalTaskCount: 10,
        createdAt: daysAgo(20),
      },
      {
        id: "task-15",
        sequence: 7,
        name: "Accessibility pass: keyboard navigation",
        // 4 members → shows 3 avatars + "+1"
        members: [MEMBERS.neha, MEMBERS.karan, MEMBERS.priya, MEMBERS.vikram],
        attachmentsCount: 0,
        commentsCount: 3,
        completedTaskCount: 4,
        totalTaskCount: 4,
        createdAt: daysAgo(11),
      },
      {
        id: "task-16",
        sequence: 8,
        name: "Regression test search and filters",
        members: [],
        attachmentsCount: 0,
        commentsCount: 0,
        completedTaskCount: 0,
        totalTaskCount: 3,
        createdAt: daysAgo(400), // from last year → date shows the year
      },
    ],
  },
  {
    id: "4",
    title: "Deployed",
    taskCount: 1,
    sequence: 4,
    tasks: [
      {
        id: "task-17",
        sequence: 1,
        name: "Auth with email magic links",
        members: [MEMBERS.karan, MEMBERS.vikram],
        attachmentsCount: 2,
        commentsCount: 6,
        completedTaskCount: 5,
        totalTaskCount: 5,
        createdAt: daysAgo(30),
      },
    ],
  },
]