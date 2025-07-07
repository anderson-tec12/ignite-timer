import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/cycles";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle, activeCycleID, markCurrentCycleAsFinished } =
    useContext(CyclesContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>

      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        autoCorrect='off'
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={1}
        disabled={!!activeCycle}
        // min={5}
        // max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
