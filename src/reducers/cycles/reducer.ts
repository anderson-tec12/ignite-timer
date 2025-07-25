import { produce } from "immer";
import { ActionTypes } from "./actions";

import music from "../../assets/music.mp3";

interface CyclesStage {
  cycles: Cycle[];
  activeCycleID: string | null;
}

export function cyclesReducer(state: CyclesStage, action: any) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleID: action.payload.newCycle.id,
      // };

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleID = action.payload.newCycle.id;
      });
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, interruptDate: new Date() };
      //     }

      //     return cycle;
      //   }),
      //   activeCycleID: null,
      // };

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleID
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptDate = new Date();
        draft.activeCycleID = null;
      });
    }

    case ActionTypes.MARK_CURRENT_CYCLE_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, finishedDate: new Date() };
      //     }

      //     return cycle;
      //   }),
      // };

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleID
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleID = null;
        const audio = new Audio(music);
        audio.play();
      });
    }

    default: {
      return state;
    }
  }
}
