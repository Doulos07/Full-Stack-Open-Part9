import { SyntheticEvent, useState } from "react";

interface UseFieldInput {
  type: string;
  value: string;
  onChange: (event: SyntheticEvent) => void;
}

export const useField = (type: string): [UseFieldInput, () => void] => {
  const [value, setValue] = useState("");

  const onChange = (event: SyntheticEvent) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const reset = (): void => {
    setValue("");
  };

  const inputs: UseFieldInput = {
    type,
    value,
    onChange,
  };

  return [inputs, reset];
};
