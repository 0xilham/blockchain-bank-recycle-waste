import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import ButtonPrimary from "./misc/ButtonPrimary";
import Link from "next/link";

const Explores = ["Transparan", "Efisien", "Market Luas", "Data 100% Aman"];

const Explore = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="Explore"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Ilustrasi2.png"
              alt="BRW Illustrasi"
              layout="responsive"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              Cari & Dapatkan Limbah Sekarang
            </h3>
            <p className="my-2 text-black-500">
              Kamu dapat mencari berdasarkan limbah yang dibutuhkan. Seperti
              jenis material plastic dengan berat sebesar 100kg. Explore dan
              dapatkan sekarang!
            </p>
            <ul className="text-black-500 self-start list-inside ml-8">
              {Explores.map((Explore, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={Explore}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {Explore}
                </motion.li>
              ))}
            </ul>
            <ButtonPrimary>
              <Link href="/ExploreNFT">Explore Now</Link>
            </ButtonPrimary>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Explore;
