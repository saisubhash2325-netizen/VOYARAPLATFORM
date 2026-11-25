export default function Hero() {
  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 44 }}>Plan. Book. Travel.</h1>
      <form action="/hotels" style={{ marginTop: 24 }}>
        <input name="q" placeholder="Search hotels…" style={{ padding: 12, width: 320 }} />
        <button style={{ padding: 12 }}>Search</button>
      </form>
    </section>
  );
}
