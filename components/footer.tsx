import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="border-t-[1px] border-t-slate-100 py-8">
      <div className="xl:container mx-auto px-6 flex flex-col text-center gap-2">
        <Logo />
        <small>Copyright &copy; {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
}
