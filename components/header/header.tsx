import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../button";
import { useAuth } from "../../lib/authContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Header = () => {
    const nav = useRouter();

    const { user, logout } = useAuth();
    const [secret, setSecret] = useState(false);

    useEffect(() => {
        const async = async () => {
            try {
                const res = await axios.get("/api/eventDeets", {
                    headers: {
                        Authorization: `Bearer ${await user?.getIdToken()}`,
                    },
                });
                setSecret(res.data.ok);
            } catch (err) {
                console.log(err);
            }
        };
        async().then(() => {});
    }, []);

    const [showingMenu, setShowingMenu] = useState(false);
    return (
        <header className="flex fixed top-0 bg-black/30 backdrop-blur-lg z-10 text-white w-full justify-between py-4 px-4 xl:px-10 lg:py-6 items-center">
            <div className="w-full lg:w-1/4 flex justify-between lg:justify-start items-center">
                {showingMenu && (
                    <div className="absolute duration-300 transition-all flex flex-col z-30 w-full left-0 top-20 items-center justify-center shadow-xl border-[0.02rem] border-gray-400 border-opacity-20 bg-black/20 rounded-md lg:rounded-xl backdrop-blur-lg">
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/">Home</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Events</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Workshops</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Hackathon</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Schedule</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Sponsors</Link>
                        </div>
                        <div
                            onClick={() => setShowingMenu(false)}
                            className="font-ubuntu text-center my-4 text-xl"
                        >
                            <Link href="/coming-soon">Passes</Link>
                        </div>
                    </div>
                )}
                <i
                    className="w-1/6 lg:hidden cursor-pointer"
                    onClick={() => setShowingMenu(!showingMenu)}
                    dangerouslySetInnerHTML={{
                        __html: `<ion-icon
            size="large"
            name="menu"
          ></ion-icon>`,
                    }}
                ></i>
                <div className="flex lg:w-full items-center w-1/2 md:w-2/5">
                    <Link href="/" className="">
                        <div className="cursor-pointer w-1/2 lg:w-1/3">
                            <img src="/images/ssn.png" />
                        </div>
                    </Link>
                    <Link href="/" className="">
                        <div className="cursor-pointer w-1/2 lg:w-1/3">
                            <img src="/images/snu.png" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-10 justify-center w-1/2 font-ubuntu ">
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link className="" href="/coming-soon">
                        Events
                    </Link>
                </div>
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link href="/coming-soon">Workshops</Link>
                </div>
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link href="/coming-soon">Hackathon</Link>
                </div>
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link href="/coming-soon">Schedule</Link>
                </div>
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link href="/coming-soon">Sponsors</Link>
                </div>
                <div className="hover:tracking-wide-wide hover:font-bold transition-all duration-300">
                    <Link href="/coming-soon">Passes</Link>
                </div>
            </div>
            <div className="hidden lg:flex gap-10 w-2/3 justify-end">
                {secret && (
                    <Button
                        action={async () => {
                            nav.push("/events-data");
                        }}
                    >
                        Events Form
                    </Button>
                )}
                <Button
                    action={async () => {
                        if (user) {
                            try {
                                await logout();
                                toast.success("Logged out successfully");
                            } catch (error) {
                                toast.error("Error logging out");
                            }
                        } else {
                            nav.push("/signup");
                        }
                    }}
                >
                    {user ? "Logout" : "Register"}
                </Button>
            </div>
        </header>
    );
};

export default Header;
