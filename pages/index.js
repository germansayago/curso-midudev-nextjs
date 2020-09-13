import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Devter</h1>
        <br />
        <Link href="/timeline">
          <a>Timeline</a>
        </Link>
      </main>
      <style jsx>{`
        h1 {
          color: red;
        }
      `}</style>
    </div>
  );
}
