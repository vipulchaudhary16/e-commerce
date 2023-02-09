import Directory from "../../components/directory/Directory";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
    },
    {
      id: 2,
      title: "Jackets",
    },
    {
      id: 3,
      title: "Sneekers",
    },
    {
      id: 4,
      title: "Women",
    },
    {
      id: 5,
      title: "Men",
    },
  ];
  return (
    <>
      <Directory categories={categories} />
    </>
  );
};

export default Home;
