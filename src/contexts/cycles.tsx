import { differenceInSeconds } from "date-fns";
import { createContext, useEffect, useReducer, useState } from "react";
import { v4 } from "uuid";
import {
  ActionTypes,
  addNewCycleAction,
  interrruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { cyclesReducer } from "../reducers/cycles/reducer";

interface cycleaContextType {
  cycles: Cycle[];
  activeCycle: undefined | Cycle;
  activeCycleID: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  interrruptCycle: () => void;
  createNewCycle: (data: newCicleFormData) => void;
}

export const CyclesContext = createContext({} as cycleaContextType);

interface Props {
  children: React.ReactNode;
}

export function CycleContextProvider({ children }: Props) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleID: null,
    },
    () => {
      const storage = localStorage.getItem("@ignite-timer:cycles-state");

      if (storage) {
        return JSON.parse(storage);
      } else {
        return {
          cycles: [],
          activeCycleID: null,
        };
      }
    }
  );

  console.log("cyclesState", cyclesState);
  const { activeCycleID, cycles } = cyclesState;

  // const [activeCycleID, setActiveCycleID] = useState<string | null>(null);

  const activeCycle = cycles.find(({ id }) => id === activeCycleID);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle({ task, minutesAmount }: newCicleFormData) {
    console.log(task, minutesAmount);

    const newCycle: Cycle = {
      id: v4(),
      minutesAmount,
      task,
      startDate: new Date(),
    };

    // setCycles((state) => [...state, newCycle]);
    dispatch(addNewCycleAction(newCycle));
    // setActiveCycleID(newCycle.id);
    setAmountSecondsPassed(0);
    // reset();
  }

  function interrruptCycle() {
    // setActiveCycleID(null);

    dispatch(interrruptCycleAction());
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state", stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
