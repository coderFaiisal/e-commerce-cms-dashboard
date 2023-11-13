export default async function Home() {
  const res = await fetch(
    "https://timeless-backend.vercel.app/api/v1/products"
  );

  const data = await res.json();

  return (
    <div>
      Hello timeless{" "}
      {data?.data.map((pd: any) => (
        <li key={pd._id}>{pd.name}</li>
      ))}
    </div>
  );
}
