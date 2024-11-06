import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderAuth from "./HeaderAuth";

const Header = async () => {
  const supabase = createClient();
  const res = await supabase.auth.getUser();
  const user = res.data.user;

  return (
    <header
      className={`w-full max-w-[1200px] flex justify-between items-center mx-auto pt-12 pb-4 sticky top-0 left-0 right-0 z-10 bg-white`}
    >
      <Link href={"/"} className="max-w-[92px] max-h-[32px]">
        <img src="/따꼼.svg" />
      </Link>
      <HeaderLinks />
      <HeaderAuth user={user} />
    </header>
  );
};

export default Header;
