import Directory from "../../components/directory/Directory";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      route: "shop/hats"
    },
    {
      id: 2,
      title: "Jackets",
      route: "shop/jackets"
    },
    {
      id: 3,
      title: "Sneakers",
      route: "shop/sneakers"
    },
    {
      id: 4,
      title: "Women",
      route: 'shop/womens'
    },
    {
      id: 5,
      title: "Men",
      route: "shop/mens"
    },
  ];
  return (
    <>
      <Directory categories={categories} />
    </>
  );
};

export default Home;
