CREATE TABLE "academic_years" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"term" text NOT NULL,
	"is_finalized" boolean DEFAULT false NOT NULL,
	"finalized_at" timestamp,
	"finalized_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_offerings" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject_id" integer NOT NULL,
	"academic_year_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"course_id" integer,
	"is_grade_input_open" boolean DEFAULT false NOT NULL,
	"input_start_at" timestamp,
	"input_end_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_code" text NOT NULL,
	"course_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "courses_course_code_unique" UNIQUE("course_code"),
	CONSTRAINT "courses_course_name_unique" UNIQUE("course_name")
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"course_offering_id" integer NOT NULL,
	"enrollment_status" text DEFAULT 'enrolled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evaluation_weights" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_offering_id" integer NOT NULL,
	"attendance_weight" integer NOT NULL,
	"attitude_weight" integer NOT NULL,
	"assignment_weight" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grades" (
	"id" serial PRIMARY KEY NOT NULL,
	"enrollment_id" integer NOT NULL,
	"attendance_rate" numeric(5, 2),
	"attitude_score" numeric(5, 2),
	"assignment_score" numeric(5, 2),
	"final_score" numeric(5, 2),
	"final_evaluation" text,
	"updated_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"staff_no" text NOT NULL,
	"name_kana" text,
	"gender" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "staff_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "staff_staff_no_unique" UNIQUE("staff_no")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_no" text NOT NULL,
	"name" text NOT NULL,
	"name_kana" text NOT NULL,
	"gender" text,
	"course_id" integer,
	"grade_year" integer NOT NULL,
	"status" text DEFAULT 'enrolled' NOT NULL,
	"enrollment_date" date,
	"graduation_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_student_no_unique" UNIQUE("student_no")
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject_code" text NOT NULL,
	"subject_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subjects_subject_code_unique" UNIQUE("subject_code")
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"teacher_no" text NOT NULL,
	"name_kana" text,
	"gender" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teachers_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "teachers_teacher_no_unique" UNIQUE("teacher_no")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_finalized_by_staff_id_fk" FOREIGN KEY ("finalized_by") REFERENCES "public"."staff"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_offerings" ADD CONSTRAINT "course_offerings_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_offerings" ADD CONSTRAINT "course_offerings_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_offerings" ADD CONSTRAINT "course_offerings_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_offerings" ADD CONSTRAINT "course_offerings_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_offering_id_course_offerings_id_fk" FOREIGN KEY ("course_offering_id") REFERENCES "public"."course_offerings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluation_weights" ADD CONSTRAINT "evaluation_weights_course_offering_id_course_offerings_id_fk" FOREIGN KEY ("course_offering_id") REFERENCES "public"."course_offerings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grades" ADD CONSTRAINT "grades_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grades" ADD CONSTRAINT "grades_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "academic_year_term_uidx" ON "academic_years" USING btree ("year","term");--> statement-breakpoint
CREATE INDEX "course_offerings_teacher_idx" ON "course_offerings" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "course_offerings_subject_idx" ON "course_offerings" USING btree ("subject_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_course_offering_uidx" ON "enrollments" USING btree ("student_id","course_offering_id");--> statement-breakpoint
CREATE UNIQUE INDEX "evaluation_weights_course_offering_uidx" ON "evaluation_weights" USING btree ("course_offering_id");--> statement-breakpoint
CREATE UNIQUE INDEX "grades_enrollment_uidx" ON "grades" USING btree ("enrollment_id");