import EventLink from "@/components/homePage/EventLink";
import PageLink from "@/components/homePage/PageLink";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-40">
      <PageLink />
      <EventLink />
    </div>
  );
};

export default HomePage;
