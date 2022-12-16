import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../../../../contexts/cycles";

import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleID,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // converte minutos para segundos

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // pega os segundos e subtrai pelos segundos ja passado
  const minutesAmount = Math.floor(currentSeconds / 60); // arredonda pra baixo, transformando segundos em minutos
  const secondsAmount = currentSeconds % 60; // pegando o resto da divisão que não cabe em minutos logo é os segundos

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          // setCycles((state) =>
          //   state.map((cycle) => {
          //     if (cycle.id === activeCycleID) {
          //       return { ...cycle, finishedDate: new Date() };
          //     }

          //     return cycle;
          //   })
          // );
          markCurrentCycleAsFinished();
          setSecondsPassed(secondsDifference);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    setSecondsPassed,
    activeCycle,
    totalSeconds,
    activeCycleID,
    markCurrentCycleAsFinished,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite timer | ${minutes}:${seconds}`;
      console.log(document.title);
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
