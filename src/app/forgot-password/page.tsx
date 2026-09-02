import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen bg-[#fafafa]">
            <header className="flex h-16 items-center bg-[#273b64] px-[5%]">
                <p className="text-xl font-medium text-white">SANSUN学園</p>
            </header>

            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-10">
                <section className="w-full max-w-125 rounded-xl border border-gray-200 bg-white px-10 py-11 shadow-md">
                    <h1 className="text-center text-3xl font-bold text-black">
                        パスワードをお忘れの方
                    </h1>

                    <p className="mt-5 text-center text-sm leading-6 text-gray-600">
                        登録されているメールアドレスを入力してください。
                        <br />
                        パスワード再設定用のリンクを送信します。
                    </p>

                    <form className="mt-9">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-base font-semibold text-black"
                            >
                                メールアドレス
                            </label>

                            <div className="flex h-14 items-center rounded-xl border border-gray-700 px-4 focus-within:border-[#3f6ca8] focus-within:ring-1 focus-within:ring-[#3f6ca8]">
                                <MailIcon />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@sansun.ac.jp"
                                    className="ml-3 w-full bg-transparent text-base text-black outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-9 h-14 w-full rounded-xl bg-[#3f6ca8] text-lg font-semibold text-white transition hover:bg-[#345d91]"
                        >
                            再設定メールを送信
                        </button>
                    </form>

                    <div className="mt-7 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-[#3769a7] underline"
                        >
                            ログイン画面へ戻る
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

function MailIcon() {
    return (
        <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="shrink-0 text-black"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}