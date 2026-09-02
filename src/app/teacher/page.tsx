import Link from "next/link";

type Subject = {
    id: number;
    name: string;
    year: string;
    inputPeriod: string;
    status: string;
    color: string;
    lightColor: string;
    icon: "web" | "programming" | "database";
};

const subjects: Subject[] = [
    {
        id: 1,
        name: "Webデザイン",
        year: "2024年度 前期",
        inputPeriod: "5/1 ～ 7/31",
        status: "入力期間中",
        color: "#2f66cc",
        lightColor: "#e8eefb",
        icon: "web",
    },
    {
        id: 2,
        name: "プログラミング",
        year: "2024年度 前期",
        inputPeriod: "5/1 ～ 7/31",
        status: "入力期間中",
        color: "#0793a2",
        lightColor: "#e6f3f5",
        icon: "programming",
    },
    {
        id: 3,
        name: "データベース",
        year: "2024年度 前期",
        inputPeriod: "5/1 ～ 7/31",
        status: "入力期間中",
        color: "#5c53b4",
        lightColor: "#eeecf8",
        icon: "database",
    },
];

export default function TeacherPage() {
    return (
        <main className="min-h-screen bg-[#fafafa] text-black">
            <header className="flex h-20 items-center bg-[#273b64] px-[5%]">
                <p className="text-xl font-medium text-white sm:text-2xl">
                    SANSUN学園
                </p>
            </header>

            <div className="mx-auto w-full max-w-360 px-6 py-14 sm:px-10 lg:px-14">
                <section>
                    <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">
                        担当科目一覧
                    </h1>

                    <p className="mt-5 text-sm sm:text-base">
                        科目を選択すると、成績入力画面に進みます。
                    </p>
                </section>

                <section className="mt-12">
                    <div className="flex items-center gap-3">
                        <BookIcon />

                        <h2 className="text-xl font-bold sm:text-2xl">
                            担当している科目
                        </h2>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {subjects.map((subject) => (
                            <article
                                key={subject.id}
                                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-md"
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: subject.lightColor }}
                                    >
                                        <SubjectIcon
                                            type={subject.icon}
                                            color={subject.color}
                                        />
                                    </div>

                                    <h3 className="text-2xl font-bold sm:text-3xl">
                                        {subject.name}
                                    </h3>
                                </div>

                                <div className="my-6 h-px bg-gray-200" />

                                <dl className="space-y-5 text-base">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="flex items-center gap-3 font-medium">
                                            <CalendarIcon />
                                            年度
                                        </dt>

                                        <dd className="text-right">{subject.year}</dd>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="flex items-center gap-3 font-medium">
                                            <DocumentIcon />
                                            入力期間
                                        </dt>

                                        <dd className="text-right">{subject.inputPeriod}</dd>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="flex items-center gap-3 font-medium">
                                            <StatusIcon />
                                            ステータス
                                        </dt>

                                        <dd className="rounded-full bg-[#e5f4ea] px-4 py-1 text-sm text-[#198754]">
                                            {subject.status}
                                        </dd>
                                    </div>
                                </dl>

                                <Link
                                    href={`/teacher/subjects/${subject.id}/grades`}
                                    className="mt-7 flex h-14 w-full items-center justify-center rounded-xl text-lg font-medium text-white transition hover:brightness-90"
                                    style={{ backgroundColor: subject.color }}
                                >
                                    <span>成績入力へ</span>
                                    <span className="absolute ml-64 text-2xl">›</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

function SubjectIcon({
    type,
    color,
}: {
    type: Subject["icon"];
    color: string;
}) {
    if (type === "web") {
        return (
            <svg
                width="42"
                height="42"
                viewBox="0 0 48 48"
                fill="none"
                stroke={color}
                strokeWidth="2"
            >
                <rect x="6" y="8" width="36" height="25" />
                <path d="M18 40h12M24 33v7" />
            </svg>
        );
    }

    if (type === "programming") {
        return (
            <svg
                width="42"
                height="42"
                viewBox="0 0 48 48"
                fill="none"
                stroke={color}
                strokeWidth="2"
            >
                <rect x="6" y="8" width="36" height="32" rx="3" />
                <path d="M6 15h36M20 22l-6 5 6 5M28 22l6 5-6 5" />
            </svg>
        );
    }

    return (
        <svg
            width="42"
            height="42"
            viewBox="0 0 48 48"
            fill="none"
            stroke={color}
            strokeWidth="2"
        >
            <ellipse cx="24" cy="10" rx="15" ry="6" />
            <path d="M9 10v14c0 3 7 6 15 6s15-3 15-6V10" />
            <path d="M9 24v14c0 3 7 6 15 6s15-3 15-6V24" />
        </svg>
    );
}

function BookIcon() {
    return (
        <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2f66cc"
            strokeWidth="2"
        >
            <path d="M3 5a3 3 0 0 1 3-3h5v18H6a3 3 0 0 0-3 3V5Z" />
            <path d="M21 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3V5Z" />
            <path d="M6 7h2M6 11h2M16 7h2M16 11h2" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="4" width="18" height="17" />
            <path d="M7 2v4M17 2v4M3 8h18" />
            <path d="M7 12h2M11 12h2M15 12h2M7 16h2M11 16h2" />
        </svg>
    );
}

function DocumentIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M5 2h10l4 4v16H5Z" />
            <path d="M14 2v5h5M8 11h8M8 15h8M8 19h6" />
        </svg>
    );
}

function StatusIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <rect x="3" y="4" width="18" height="17" />
            <path d="M7 9h3M14 9h3M7 15h3M14 15h3" />
        </svg>
    );
}