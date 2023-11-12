import { ChangeEvent, useState } from "react";
import { IState } from "./hooks.types";

export const useForm = <T extends IState>(inputValues: T) => {
  const [values, setValues] = useState<IState>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLButtonElement;
    const {value, name} = target;
    setValues({...values, [name]: value});
  };
  return { values, handleChange };
}