import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  serial,
  integer,
  numeric,
  date,
} from "drizzle-orm/pg-core";

/*
|--------------------------------------------------------------------------
| Better Auth
|--------------------------------------------------------------------------
*/

export const user = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  emailVerified: boolean("email_verified")
    .default(false)
    .notNull(),

  image: text("image"),

  username: text("username").unique(),

  // teacher / staff
  role: text("role").notNull(),

  // 退職・利用停止でもデータ自体は削除しない
  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),

    expiresAt: timestamp("expires_at")
      .notNull(),

    token: text("token")
      .notNull()
      .unique(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),

    ipAddress: text("ip_address"),

    userAgent: text("user_agent"),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    index("session_userId_idx")
      .on(table.userId),
  ],
);

export const account = pgTable(
  "account",
  {
    id: text("id")
      .primaryKey(),

    issuer: text("issuer")
      .notNull(),

    accountId: text("account_id")
      .notNull(),

    providerId: text("provider_id")
      .notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    accessToken: text("access_token"),

    refreshToken: text("refresh_token"),

    idToken: text("id_token"),

    accessTokenExpiresAt:
      timestamp("access_token_expires_at"),

    refreshTokenExpiresAt:
      timestamp("refresh_token_expires_at"),

    scope: text("scope"),

    password: text("password"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "account_issuer_accountId_uidx",
    ).on(
      table.issuer,
      table.accountId,
    ),

    index("account_userId_idx")
      .on(table.userId),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id")
      .primaryKey(),

    identifier: text("identifier")
      .notNull(),

    value: text("value")
      .notNull(),

    expiresAt: timestamp("expires_at")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index(
      "verification_identifier_idx",
    ).on(table.identifier),
  ],
);

/*
|--------------------------------------------------------------------------
| 講師
|--------------------------------------------------------------------------
*/

export const teachers = pgTable("teachers", {
  id: serial("id")
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id),

  teacherNo: text("teacher_no")
    .notNull()
    .unique(),

  nameKana: text("name_kana"),

  gender: text("gender"),

  status: text("status")
    .default("active")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/*
|--------------------------------------------------------------------------
| 専任職員
|--------------------------------------------------------------------------
*/

export const staff = pgTable("staff", {
  id: serial("id")
    .primaryKey(),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id),

  staffNo: text("staff_no")
    .notNull()
    .unique(),

  nameKana: text("name_kana"),

  gender: text("gender"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/*
|--------------------------------------------------------------------------
| コース
|--------------------------------------------------------------------------
*/

export const courses = pgTable("courses", {
  id: serial("id")
    .primaryKey(),

  courseCode: text("course_code")
    .notNull()
    .unique(),

  courseName: text("course_name")
    .notNull()
    .unique(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/*
|--------------------------------------------------------------------------
| 学生
|--------------------------------------------------------------------------
*/

export const students = pgTable("students", {
  id: serial("id")
    .primaryKey(),

  studentNo: text("student_no")
    .notNull()
    .unique(),

  name: text("name")
    .notNull(),

  nameKana: text("name_kana")
    .notNull(),

  gender: text("gender"),

  courseId: integer("course_id")
    .references(() => courses.id),

  gradeYear: integer("grade_year")
    .notNull(),

  // enrolled / leave / withdrawn / graduated
  status: text("status")
    .default("enrolled")
    .notNull(),

  enrollmentDate: date("enrollment_date"),

  graduationDate: date("graduation_date"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/*
|--------------------------------------------------------------------------
| 年度
|--------------------------------------------------------------------------
*/

export const academicYears = pgTable(
  "academic_years",
  {
    id: serial("id")
      .primaryKey(),

    year: integer("year")
      .notNull(),

    // first / second
    term: text("term")
      .notNull(),

    isFinalized: boolean("is_finalized")
      .default(false)
      .notNull(),

    finalizedAt: timestamp("finalized_at"),

    finalizedBy: integer("finalized_by")
      .references(() => staff.id),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "academic_year_term_uidx",
    ).on(
      table.year,
      table.term,
    ),
  ],
);

/*
|--------------------------------------------------------------------------
| 科目
|--------------------------------------------------------------------------
*/

export const subjects = pgTable("subjects", {
  id: serial("id")
    .primaryKey(),

  subjectCode: text("subject_code")
    .notNull()
    .unique(),

  subjectName: text("subject_name")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/*
|--------------------------------------------------------------------------
| 開講科目
|--------------------------------------------------------------------------
|
| 「プログラミング」という科目そのものが subjects
|
| 「2026年度前期・システムエンジニアコース・
|   担当○○先生のプログラミング」
| が course_offerings
|
*/

export const courseOfferings = pgTable(
  "course_offerings",
  {
    id: serial("id")
      .primaryKey(),

    subjectId: integer("subject_id")
      .notNull()
      .references(() => subjects.id),

    academicYearId: integer("academic_year_id")
      .notNull()
      .references(() => academicYears.id),

    teacherId: integer("teacher_id")
      .notNull()
      .references(() => teachers.id),

    // 共通科目の場合は null でもOK
    courseId: integer("course_id")
      .references(() => courses.id),

    isGradeInputOpen:
      boolean("is_grade_input_open")
        .default(false)
        .notNull(),

    inputStartAt:
      timestamp("input_start_at"),

    inputEndAt:
      timestamp("input_end_at"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index(
      "course_offerings_teacher_idx",
    ).on(table.teacherId),

    index(
      "course_offerings_subject_idx",
    ).on(table.subjectId),
  ],
);

/*
|--------------------------------------------------------------------------
| 履修
|--------------------------------------------------------------------------
*/

export const enrollments = pgTable(
  "enrollments",
  {
    id: serial("id")
      .primaryKey(),

    studentId: integer("student_id")
      .notNull()
      .references(() => students.id),

    courseOfferingId:
      integer("course_offering_id")
        .notNull()
        .references(
          () => courseOfferings.id,
        ),

    // enrolled / repeating / completed
    enrollmentStatus:
      text("enrollment_status")
        .default("enrolled")
        .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "student_course_offering_uidx",
    ).on(
      table.studentId,
      table.courseOfferingId,
    ),
  ],
);

/*
|--------------------------------------------------------------------------
| 評価重み
|--------------------------------------------------------------------------
*/

export const evaluationWeights = pgTable(
  "evaluation_weights",
  {
    id: serial("id")
      .primaryKey(),

    courseOfferingId:
      integer("course_offering_id")
        .notNull()
        .references(
          () => courseOfferings.id,
        ),

    attendanceWeight:
      integer("attendance_weight")
        .notNull(),

    attitudeWeight:
      integer("attitude_weight")
        .notNull(),

    assignmentWeight:
      integer("assignment_weight")
        .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "evaluation_weights_course_offering_uidx",
    ).on(table.courseOfferingId),
  ],
);

/*
|--------------------------------------------------------------------------
| 成績
|--------------------------------------------------------------------------
*/

export const grades = pgTable(
  "grades",
  {
    id: serial("id")
      .primaryKey(),

    enrollmentId: integer("enrollment_id")
      .notNull()
      .references(() => enrollments.id),

    attendanceRate: numeric(
      "attendance_rate",
      {
        precision: 5,
        scale: 2,
      },
    ),

    attitudeScore: numeric(
      "attitude_score",
      {
        precision: 5,
        scale: 2,
      },
    ),

    assignmentScore: numeric(
      "assignment_score",
      {
        precision: 5,
        scale: 2,
      },
    ),

    finalScore: numeric(
      "final_score",
      {
        precision: 5,
        scale: 2,
      },
    ),

    // 秀・優・良・可・不可
    finalEvaluation:
      text("final_evaluation"),

    updatedBy: text("updated_by")
      .references(() => user.id, {
        onDelete: "set null",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex(
      "grades_enrollment_uidx",
    ).on(table.enrollmentId),
  ],
);

/*
|--------------------------------------------------------------------------
| Better Auth Relations
|--------------------------------------------------------------------------
*/

export const userRelations = relations(
  user,
  ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
  }),
);

export const sessionRelations = relations(
  session,
  ({ one }) => ({
    user: one(user, {
      fields: [session.userId],
      references: [user.id],
    }),
  }),
);

export const accountRelations = relations(
  account,
  ({ one }) => ({
    user: one(user, {
      fields: [account.userId],
      references: [user.id],
    }),
  }),
);