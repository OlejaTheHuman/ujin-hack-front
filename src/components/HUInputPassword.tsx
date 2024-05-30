import {Form, Input} from "antd";
import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {PasswordProps} from "antd/es/input/Password";

interface HUInputPasswordPropsI<T extends FieldValues> extends UseControllerProps<T>, Omit<PasswordProps, 'name' | 'defaultValue'> {}

export default function HUInputPassword<T extends FieldValues>(props: HUInputPasswordPropsI<T>) {
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
      <Input.Password
        {...props}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
}