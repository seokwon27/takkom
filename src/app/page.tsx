import EventLink from "@/components/homePage/EventLink";
import PageLink from "@/components/homePage/PageLink";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-40 max-sm:gap-14">
      <PageLink />
      <EventLink />
    </div>
  );
};

export default HomePage;
