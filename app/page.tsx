"use client"
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import MainSection from "@/components/organism/main/MainSection";

export default function Home() {
  // const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MainSection/>
    </div>
  );
}
