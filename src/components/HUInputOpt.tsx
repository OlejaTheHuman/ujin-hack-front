import {Form, Input} from "antd";
import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {OTPProps} from "antd/es/input/OTP";

interface HUInputOptPropsI<T extends FieldValues> extends UseControllerProps<T>, Omit<OTPProps, 'name' | 'defaultValue'> {}

export default function HUInputOpt<T extends FieldValues>(props: HUInputOptPropsI<T>) {
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
      <Input.OTP
        {...props}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
}