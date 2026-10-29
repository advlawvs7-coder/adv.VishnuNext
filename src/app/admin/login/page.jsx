import LoginForm from "@/components/admin/LoginForm";
export const metadata = {
  title: "Admin Login | Advocate Vishnu Sharma",
  robots: { index: false, follow: false },
};
export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-midnight px-4">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center text-white">
          <p className="kicker mb-2">Secure Administration</p>
          <h1 className="font-serif text-3xl">Dr. Advocate Vishnu Sharma</h1>
          <p className="mt-2 text-sm text-slate-400">
            Website Content Management
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
