export default function AppLayout({ children }) {
  return (
    <>
      <div className="layout">
        <main>{children}</main>
      </div>
    </>
  );
}
