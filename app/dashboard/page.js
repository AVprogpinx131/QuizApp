"use client";

import React, { useState, useEffect } from "react";
import { quiz } from "../data.js";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/legacy/image.js";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer, source } =
    questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      // console.log("true");
    } else {
      setSelectedAnswer(false);
      // console.log("false");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <main>
        <Link href="/">
          <Skeleton width={32} height={32} style={{ marginBottom: "1rem" }} />
        </Link>
        <Skeleton />
        <Skeleton style={{ marginBottom: "2em" }} />
        <Skeleton height={500} style={{ borderRadius: "10px" }} />
      </main>
    );
  }

  return (
    <main>
      <div class="w-8 mb-6">
        <Link href="/">
          <BiArrowBack class="w-8 h-8" />
        </Link>
      </div>
      <h1 class="pb-3">Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      {!showResult ? (
        <div class="mt-7">
          <div class="py-10 px-5 relative flex justify-center items-center">
            <Image
              src={source}
              alt="quiz background image"
              layout="fill"
              objectFit="cover"
              priority={true}
              class="rounded-lg"
            />
            <div className="quiz-content">
              <h3 class="text-white">{question}</h3>
              {answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={
                    selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                  }
                >
                  <span class="text-white">{answer}</span>
                </li>
              ))}
              {checked ? (
                <button onClick={nextQuestion} className="btn">
                  {activeQuestion === question.length - 1 ? "Finish" : "Next"}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled
                  className="btn-disabled"
                >
                  {" "}
                  {activeQuestion === question.length - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h3>Results</h3>
          <h3>Overall {(result.correctAnswers / questions.length) * 100}%</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </main>
  );
};

export default page;
