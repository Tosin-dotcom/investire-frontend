
import NavBar from "@/components/layout/Nav";
import SideNav from "@/components/layout/SideNav";


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="en">
      <body>
      <div className="flex flex-col h-screen">
        <NavBar userName={""} />
        <div className="flex flex-1 overflow-hidden">
          <SideNav />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
      </body>
      </html>
  );
}
