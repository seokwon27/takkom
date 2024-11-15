import EventLink from "@/components/homePage/EventLink";
import PageLink from "@/components/homePage/PageLink";
import MobileLayout from "@/components/layout/MobileLayout";
import Image from "next/image";
import Logo from "../../public/logo.svg";

const HomePage = () => {
  return (
    <>
      <MobileLayout>
        <Image src={Logo} alt="로고" className="mt-3 ml-6" />
      </MobileLayout>
      <div className="flex flex-col gap-40 max-sm:gap-14 max-sm:mb-[100px]">
        <PageLink />
        <EventLink />
      </div>
    </>
  );
};

export default HomePage;
