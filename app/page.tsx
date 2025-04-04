import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
