import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#fafafa]">
            <header className="flex h-20 items-center bg-[#273b64] px-[5%]">
                <p className="text-2xl font-medium text-white">SANSUN学園</p>
            </header>

            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">
                <section className="w-full max-w-125 rounded-xl border border-gray-200 bg-white px-14 py-16 shadow-md">
                    <h1 className="text-center text-3xl font-bold tracking-wide text-black">
                        成績管理システム
                    </h1>

                    <div className="mt-4 flex items-center justify-center gap-5">
                        <span className="h-px w-24 bg-gray-400" />
                        <p className="whitespace-nowrap text-xl text-black">
                            ログインしてください
                        </p>
                        <span className="h-px w-24 bg-gray-400" />
                    </div>

                    <form className="mt-10">
                        <div>
                            <label
                                htmlFor="userId"
                                className="mb-2 block text-lg font-semibold text-black"
                            >
                                ユーザーID
                            </label>

                            <div className="flex h-16 items-center rounded-xl border border-black px-5">
                                <UserIcon />

                                <input
                                    id="userId"
                                    name="userId"
                                    type="text"
                                    placeholder="ユーザーIDを入力してください"
                                    className="ml-4 w-full bg-transparent text-lg text-black outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-lg font-semibold text-black"
                            >
                                パスワード
                            </label>

                            <div className="flex h-16 items-center rounded-xl border border-black px-5">
                                <LockIcon />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="パスワードを入力してください"
                                    className="ml-4 w-full bg-transparent text-lg text-black outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-16 h-16 w-full rounded-xl bg-[#3f6ca8] text-xl font-semibold text-white transition hover:bg-[#345d91]"
                        >
                            ログイン
                        </button>
                    </form>

                    <div className="mt-9 text-center">
                        <Link
                            href="/forgot-password"
                            className="text-lg text-[#3769a7] underline"
                        >
                            パスワードをお忘れの方はこちら
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

function UserIcon() {
    return (
        <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="shrink-0 text-black"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="shrink-0 text-black"
        >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15.5" r="1" fill="currentColor" />
        </svg>
    );
}