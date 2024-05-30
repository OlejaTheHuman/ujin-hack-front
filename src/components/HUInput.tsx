import {Form, Input, InputProps} from "antd";
import {FieldValues, useController, UseControllerProps} from "react-hook-form";

interface HUInputPropsI<T extends FieldValues> extends UseControllerProps<T>, Omit<InputProps, 'name' | 'defaultValue'> {}

export default function HUInput<T extends FieldValues>(props: HUInputPropsI<T>) {
  const {
    formState: {errors},
    field: {onChange, value},
  } = useController(props);

  const errorMessage = errors?.[props.name]?.message as string | undefined;

  return (
    <Form.Item
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : ''}
    >
      <Input
        {...props}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
}