export default function ProfilePage({ params }: any) {
  return (
    <>
      <h1>Profile Page</h1>
      <hr />
      <h3 className="bg-red-400 text-center text-white">Welcome,{params.id}</h3>
    </>
  );
}
