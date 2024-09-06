"use client";

// import necessay dependencies
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";
import Image from "next/image";
import asharibAli from "./../../public/asharibAli.jpg";

// define types

type ConfettiProps = {
  width: number;
  height: number;
};

// dynamic import and variables

const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });
// Define color arrays for candles, balloons, and confetti
const candleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const confettiColors: string[] = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
];

export default function BirthdayWish () {
  // state variables
  const [candlesLit, setCandlesLit] = useState<number>(0); // Number of lit candle
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0); //Number of popped balloons
  const [showConfetti, setShowConfetti] = useState<boolean>(false); // whether to show confetti
  const [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  }); // Window size for confetti
  const [celebrating, setCelebrating] = useState<boolean>(false); // wehter celebration started

  // Constants
  const totalCandles: number = 5; // Total number of candles
  const totalBalloons: number = 5; // Total number of balloons
  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);
  // Effect to show confetti when all candles are lit and all balloons are popped
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true);
    }
  }, [candlesLit, balloonsPoppedCount]);
  // Function to light a candle
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };
  // Function to pop a balloon
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount((prev) => prev + 1);
    }
  };
  // Funciton to start celebration
  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  return (
    // Main container
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 mx-auto my-auto">
      {/* Animated wrapper for the card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Birthday Card */}
        <Card className="bg-red-50 mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-red-700 rounded-2xl">
          {/* Card header with birthday message */}
          <CardHeader className="text-center">
            {/* Image Asharib Ali */}
            <div className="flex items-center justify-center">
              <Image
                src={asharibAli}
                alt="asharibAliImage"
                className="w-20 rounded-full border-2 h-20 border-red-700"
                width={1000}
                height={1000}
              />
            </div>
            <CardTitle className="text-4xl font-bold text-red-700">
              Happy 20th Birthday!
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-red-600">
              Asharib Ali
            </CardDescription>
            <p className="text-lg text-red-500">September 4th</p>
          </CardHeader>
          {/* Card Content with candles and balloons*/}
          <CardContent className="space-y-6 text-center">
            {/* Candle Section */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                Light the candles
              </h3>
              <div className="flex justify-center space-x-2">
                {/* Map through candle */}
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {/* Render Lit or Unlit candle based on state */}
                    {(celebrating && index <= candlesLit) ||
                    (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: celebrating ? index * 0.5 : 0,
                        }}
                      >
                        {/* Lit candle */}
                        <FaBirthdayCake
                          className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                          style={{
                            color: candleColors[index % candleColors.length],
                          }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      // Unlit candle
                      <FaBirthdayCake
                        className="w-8 h-8 text-red-200 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            {/* Balloon section */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 ">
                Pop the Balloons:
              </h3>
              <div className="flex justify-center space-x-2">
                {/* Map through balloons */}
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Balloon icon */}
                    <GiBalloons
                      className="w-8 h-8 cursor-pointer hover:scale-110"
                      style={{
                        color:
                          index < balloonsPoppedCount
                            ? "#D1D5DB"
                            : balloonColors[index % balloonColors.length],
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          {/* Card footer with celebrate button */}
          <CardFooter className="flex justify-center">
            <Button
              className=" bg-red-700 text-red-50 hover:bg-red-300 hover:text-red-700 active:ml-2 mt-2 transition-all duration-300 border-none rounded-xl"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          <p className="flex justify-center text-red-700 font-serif">
            From Huzaifa Ayub
          </p>
        </Card>
      </motion.div>
      {/* Confetti Component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
}
